import React from "react";
import {notFound} from "next/navigation";
import Image from "next/image";
import {auth} from "@/auth";
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_ID_QUERY, type AuthorQueryData} from "@/sanity/lib/queries";
import UserStartups from "@/components/UserStartups";
import {StartupCardSkeleton} from "@/components/StartupCard";

export const experimental_ppr = true;

async function Page(props: Readonly<{params: Promise<{id: string}>}>) {
  const params = await props.params;
  const session = await auth();
  const user = await client.fetch<AuthorQueryData>(AUTHOR_BY_ID_QUERY, {
    id: params.id,
  });

  if (!user) {
    return notFound();
  }

  return (
    <React.Fragment>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black line-clamp-1 text-center uppercase">
              {user.name}
            </h3>
          </div>
          <Image
            src={user?.image || "https://placehold.co/48x48"}
            alt={user?.name || "avatar"}
            width={220}
            height={220}
            className="profile_image"
          />
          <p className="text-30-extrabold mt7 text-center">@{user.username}</p>
          <p className="text-14-normal mt-1 text-center">{user.bio}</p>
        </div>
        <div className="flex flex-1 flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === params.id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <React.Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={params.id} />
            </React.Suspense>
          </ul>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Page;
