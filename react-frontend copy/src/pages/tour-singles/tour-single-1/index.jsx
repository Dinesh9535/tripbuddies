 
import MetaComponent from "@/components/common/MetaComponent";
import Header3 from "@/components/layout/header/Header3";
import PageHeader from "@/components/tourSingle/PageHeader";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleOne from "@/components/tourSingle/pages/SingleOne";
import FooterFour from "@/components/layout/footers/FooterFour";
import { allTour } from "@/data/tours";
import { useParams } from "react-router-dom";
import React from "react";



const metadata = {
  title: "Trip Planner |  Machathon | Valtech",
  description: "Trip Planner for all",
};

export default function TourSinglePage1() {
  let params = useParams();
  const id = params.id;
  const tour = allTour.find((item) => item.id == id) || allTour[0];

  return (
    <>
      <MetaComponent meta={metadata} />

      <main>
        <Header3 />
        <PageHeader /> 
        <SingleOne tour={tour} />
        <TourSlider />
        <FooterFour />
      </main>
    </>
  );
}
