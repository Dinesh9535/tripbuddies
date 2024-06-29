import Profile from "@/components/dasboard/Profile";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Trip Planner |  Machathon | Valtech",
  description: "Trip Planner for all",
};

export default function DBProfilePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Profile />
      </main>
    </>
  );
}
