import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {client} from "@/sanity/lib/client";
import {
  AUTHOR_BY_GITHUB_ID_QUERY,
  type AuthorQueryData,
} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [GitHubProvider],
  callbacks: {
    async signIn({user, profile}) {
      const existing = await client
        .withConfig({useCdn: false})
        .fetch<AuthorQueryData>(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});

      if (!existing) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name: user.name,
          username: profile?.login,
          email: user.email,
          image: user.image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },
    async jwt({token, account, profile}) {
      if (account && profile) {
        const user = await client.fetch<AuthorQueryData>(
          AUTHOR_BY_GITHUB_ID_QUERY,
          {id: profile.id},
        );

        token.id = user?._id;
      }

      return token;
    },
    async session({session, token}) {
      return Object.assign(session, {id: token.id});
    },
  },
});
