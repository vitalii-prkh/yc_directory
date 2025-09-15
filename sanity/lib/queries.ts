import {defineQuery} from "next-sanity";
import type {Author, Startup} from "@/sanity/types";

export type StartupQueryData = StartupPost[];

export type StartupPost = Omit<Startup, "author"> & {
  author?: Pick<Author, "_id" | "name" | "image" | "bio">;
};

export const STARTUP_QUERY = defineQuery(`
*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  category,
  image
}
`);
