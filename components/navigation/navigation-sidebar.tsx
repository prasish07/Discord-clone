import React from "react";
import { redirect } from "next/navigation";

import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import NavigationAction from "./navigation-action";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
    </div>
  );
};

export default NavigationSidebar;
