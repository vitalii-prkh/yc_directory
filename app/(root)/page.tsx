import React from "react";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {STARTUPS_QUERY, type StartupsQueryData} from "@/sanity/lib/queries";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const params = await searchParams;
  const {data}: {data: StartupsQueryData} = await sanityFetch({
    query: STARTUPS_QUERY,
    params: {
      search: params.query || null,
    },
  });

  return (
    <React.Fragment>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competition.
        </p>
        <SearchForm query={params.query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {params.query
            ? `Search results for "${params.query}"`
            : "All Startups"}
        </p>
        <ul className="card_grid mt-7">
          {!data?.length && <p className="no-results">No startups found</p>}
          {data?.map((post) => (
            <StartupCard
              key={post._id}
              post={post}
            />
          ))}
        </ul>
      </section>
      <SanityLive />
    </React.Fragment>
  );
}

export default Home;
