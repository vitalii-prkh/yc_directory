import {defineQuery} from "next-sanity";
import type {Author, Startup} from "@/sanity/types";

export type StartupsQueryData = StartupPost[];

export type StartupPost = Omit<Startup, "author" | "pitch"> & {
  author?: Pick<Author, "_id" | "name" | "image" | "bio">;
};

export type StartupData = Omit<Startup, "author"> & {
  author?: Pick<Author, "_id" | "name" | "username" | "image" | "bio">;
};

export type StartupViews = Pick<Startup, "_id" | "views">;

export type AuthorQueryData = Pick<
  Author,
  "_id" | "id" | "name" | "username" | "email" | "image" | "bio"
>;

export type StartupPayload = Pick<
  Startup,
  | "_type"
  | "title"
  | "description"
  | "category"
  | "image"
  | "slug"
  | "author"
  | "pitch"
>;

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
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
}`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name,
    username,
    image,
    bio
  },
  views,
  description,
  category,
  image,
  pitch
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  views
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
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
}`);
