import { React, useState, useEffect } from "react";
import MainInformation from "../MainInformation";
import OthersInformation from "../OthersInformation";
import Overview from "../Overview";
import Included from "../Included";
import Map from "@/components/tours/Map";
import Faq from "../Faq";
import TourSingleSidebar from "../TourSingleSidebar";
import Gallery1 from "../Galleries/Gallery1";
import RoadMap2 from "../Roadmap2";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SingleOne({ tour }) {
  const [tourData, setTourData] = useState(null); // Changed to null for better initial state handling

  useEffect(() => {
    if (tour && tour.id) {
      const fetchTours = async () => {
        try {
          const response = await axios.get(`http://localhost:1337/api/trips/${tour.id}?populate=*`);
          setTourData(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error("Error fetching data from Strapi:", error);
        }
      };

      fetchTours();
    } else {
      console.log("Tour or Tour ID is undefined:", tour);
    }
  }, [tour]);

  //debug
  console.log(tourData)


  if (!tourData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="">
        <div className="container">
          <MainInformation tourData={tourData} />
          <Gallery1 tourData={tourData.attributes.tripimage.data} />
        </div>
      </section>

      <section className="layout-pt-md js-pin-container">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-lg-8">
              <div className="row y-gap-20 justify-between items-center layout-pb-md">
                <OthersInformation tourData={tourData} />
              </div>

              <Overview />

              <div className="line mt-60 mb-60"></div>

              <h2 className="text-30">What's included</h2>

              <Included tourData={tourData} />

              <div className="line mt-60 mb-60"></div>

              <h2 className="text-30">Itinerary</h2>

              <RoadMap2 />

              <h2 className="text-30 mt-60 mb-30">Tour Map</h2>
              <div className="mapTourSingle">
                <Map />
              </div>

              <div className="line mt-60 mb-60"></div>

              <h2 className="text-30">FAQ</h2>

              <div className="accordion -simple row y-gap-20 mt-30 js-accordion">
                <Faq />
              </div>
              <div className=" mt-60 mb-60"></div>
            </div>

            <div className="col-lg-4 ">
              <div className="d-flex justify-end js-pin-content">
                <TourSingleSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
