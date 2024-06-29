import FooterFour from "@/components/layout/footers/FooterFour";
import Header3 from "@/components/layout/header/Header3";
import PageHeader from "@/components/tours/PageHeader";
import TourList1 from "@/components/tours/TourList1";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Trip Planner |  Machathon | Valtech",
  description: "Trip Planner for all",
};

export default function TourListPage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header3/>
        <PageHeader />
        <TourList1 />
        <FooterFour />
      </main>
    </>
  );
}
