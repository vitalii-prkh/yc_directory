import {after} from "next/server";
import Ping from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import {STARTUP_VIEWS_QUERY, type StartupViews} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";

async function View(props: {id: string}) {
  const data = await client
    .withConfig({useCdn: false})
    .fetch<StartupViews>(STARTUP_VIEWS_QUERY, {id: props.id});

  after(async () => {
    await writeClient
      .patch(props.id)
      .set({views: (data.views || 0) + 1})
      .commit();
  });

  return (
    <div className="view-container">
      <div className="absolute -right-2 -top-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {data.views}</span>
      </p>
    </div>
  );
}

export default View;
