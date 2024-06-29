import DBMain from "@/components/dasboard/main";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Trip Planner |  Machathon | Valtech",
  description: "Trip Planner for all",
};

export default function DBMainPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <DBMain />
      </main>
    </>
  );
}
