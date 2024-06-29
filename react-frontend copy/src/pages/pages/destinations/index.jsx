 
import FooterFour from "@/components/layout/footers/FooterFour";
import Header3 from "@/components/layout/header/Header3";
import Hero from "@/components/pages/destinations/Hero";
import TourList1 from "@/components/pages/destinations/TourList";
 
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Trip Planner |  Machathon | Valtech",
  description: "Trip Planner for all",
};

export default function DestinationsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header3 />
        <Hero /> 
        <TourList1 />  
        <FooterFour />
      </main>
    </>
  );
}
