import React from "react";
import {redirect} from "next/navigation";
import {auth} from "@/auth";
import StartupForm from "@/components/StartupForm";

async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <React.Fragment>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup Pitch</h1>
      </section>
      <StartupForm />
    </React.Fragment>
  );
}

export default Page;
