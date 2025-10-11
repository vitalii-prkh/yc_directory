import React from "react";
import Link from "next/link";
import Image from "next/image";
import {LogOut, BadgePlus} from "lucide-react";
import {auth, signOut, signIn} from "@/auth";
import {getInitials} from "@/lib/getInitials";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";

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
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({redirectTo: "/"});
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 text-red-500 sm:hidden" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || "avatar"}
                  />
                  <AvatarFallback>
                    {getInitials(session?.user?.name || "**")}
                  </AvatarFallback>
                </Avatar>
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
