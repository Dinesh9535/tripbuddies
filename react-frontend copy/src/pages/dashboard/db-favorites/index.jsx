import Favorites from "@/components/dasboard/Fevorite";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Trip Planner |  Machathon | Valtech",
  description: "Trip Planner for all",
};

export default function DBFavoritesPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Favorites />
      </main>
    </>
  );
}
