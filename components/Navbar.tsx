import React from "react";
import Link from "next/link";
import Image from "next/image";
import {auth, signOut, signIn} from "@/auth";

async function Navbar() {
  const session = await auth();
  const isSession = session && session.user;

  return (
    <header className="bg-white px-5 py-3 font-work-sans shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={144}
            height={30}
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {isSession && (
            <React.Fragment>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({redirectTo: "/"});
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </React.Fragment>
          )}
          {!isSession && (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
