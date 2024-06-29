
import PopulerDestinations from "@/components/homes/destinations/PopulerDestinations";
import TrendingDestinationsTwo from "@/components/homes/destinations/TrendingDestinationsTwo";
import Hero4 from "@/components/homes/heros/Hero4";
import FeaturedToures from "@/components/homes/tours/FeaturedToures";
import FooterFour from "@/components/layout/footers/FooterFour";
import Header3 from "@/components/layout/header/Header3";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Trip Planner |  Machathon | Valtech",
  description: "Trip Planner for all",
};

export default function HomePage4() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header3 />
        <Hero4 />
        <FeaturedToures />
        <PopulerDestinations />
        <TrendingDestinationsTwo />
        <FooterFour />
      </main>
    </>
  );
}
