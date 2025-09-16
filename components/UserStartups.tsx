import React from "react";
import {client} from "@/sanity/lib/client";
import {
  STARTUPS_BY_AUTHOR_QUERY,
  type StartupsQueryData,
} from "@/sanity/lib/queries";
import StartupCard from "@/components/StartupCard";

async function UserStartups({id}: {id: string}) {
  const startups = await client.fetch<StartupsQueryData>(
    STARTUPS_BY_AUTHOR_QUERY,
    {id},
  );

  return (
    <React.Fragment>
      {!startups.length && <p className="no-results">No posts yet</p>}
      {startups.map((startup) => (
        <StartupCard
          key={startup._id}
          post={startup}
        />
      ))}
    </React.Fragment>
  );
}

export default UserStartups;
