import React from "react";
import {notFound} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import {formatDate} from "@/lib/utils";
import {client} from "@/sanity/lib/client";
import {STARTUP_BY_ID_QUERY, type StartupData} from "@/sanity/lib/queries";
import {Skeleton} from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;

const md = markdownit();

async function Page(props: {params: Promise<{id: string}>}) {
  const params = await props.params;
  const data = await client.fetch<StartupData>(STARTUP_BY_ID_QUERY, {
    id: params.id,
  });

  if (!data) {
    return notFound();
  }

  const parsedContent = md.render(data.pitch || "");

  return (
    <React.Fragment>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(data._createdAt)}</p>
        <h1 className="heading">{data.title}</h1>
        <p className="sub-heading !max-w-5xl">{data.description}</p>
      </section>
      <section className="section_container">
        <img
          src={data.image}
          alt="thumbnail"
          className="h-auto w-full rounded-xl"
        />
        <div className="mx-auto mt-10 max-w-4xl space-y-5">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${data?.author?._id}`}
              className="mb-3 flex items-center gap-2"
            >
              <Image
                src={data.author?.image || ""}
                alt="author"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{data.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{data.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{data.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent && (
            <article
              className="prose max-w-4xl break-all font-work-sans"
              dangerouslySetInnerHTML={{__html: parsedContent}}
            />
          )}
          {!parsedContent && <p className="no-result">No details provided</p>}
        </div>
        <hr className="divider" />
        <React.Suspense fallback={<Skeleton className="view-skeleton" />}>
          <View id={data._id} />
        </React.Suspense>
      </section>
    </React.Fragment>
  );
}

export default Page;
