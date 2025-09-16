"use server";

import slugify from "slugify";
import {auth} from "@/auth";
import {isString, parseServerActionResponse} from "@/lib/utils";
import {writeClient} from "@/sanity/lib/write-client";
import {StartupPayload} from "@/sanity/lib/queries";

export async function createPitch(_: unknown, form: FormData) {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "FAILURE",
    });
  }

  const title = form.get("title");
  const description = form.get("description");
  const category = form.get("category");
  const link = form.get("link");
  const pitch = form.get("pitch");

  if (
    isString(title) &&
    isString(description) &&
    isString(category) &&
    isString(link) &&
    isString(pitch)
  ) {
    try {
      const payload: StartupPayload = {
        _type: "startup",
        title,
        description,
        category,
        image: link,
        slug: {
          _type: "slug",
          current: slugify(title, {lower: true, strict: true}),
        },
        author: {
          _type: "reference",
          _ref: session.id,
        },
        pitch,
      };
      const result = await writeClient.create(payload);

      return parseServerActionResponse({
        ...result,
        error: "",
        status: "SUCCESS",
      });
    } catch (error) {
      return parseServerActionResponse({
        status: "FAILURE",
        error: JSON.stringify(error),
      });
    }
  }

  return parseServerActionResponse({
    status: "FAILURE",
    error: "Invalid form submission",
  });
}
