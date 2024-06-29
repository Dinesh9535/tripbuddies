import React, { useState } from "react";
import ImageLightBox from "./ImageLightBox";

// const images = [
//   {
//     id: 1,
//     image: `/img/TripDetails-1.jpg`,
//   },
//   {
//     id: 1,
//     image: `/img/TripDetails-2.jpg`,
//   },
//   {
//     id: 1,
//     image: `/img/TripDetails-3.jpg`,
//   },
//   {
//     id: 1,
//     image: `/img/TripDetails-4.jpg`,
//   },
// ];
export default function Gallery1(tourData) {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  // console.log(tourData)
  // const tourImage = tourData.tourData.attributes.title;
  // console.log(tourImage)
  return (
    <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid mobile-css-slider-2">
          {tourData.tourData.map((elm, i)=> (
            // console.log(elm)
              <img src={"http://localhost:1337"+elm.attributes.url} alt="image" />
          ))}
          {/* <img src="/img/TripDetails-1.jpg" alt="image" />
          <img src="/img/TripDetails-2.jpg" alt="image" />
          <img src="/img/TripDetails-3.jpg" alt="image" />
          <img src="/img/TripDetails-4.jpg" alt="image" /> */}
        </div>

        <div className="tourSingleGrid__button">
          <div
            style={{ cursor: "pointer" }}
            className="js-gallery"
            data-gallery="gallery1"
          >
            <span
              onClick={() => setActiveLightBox(true)}
              className="button -accent-1 py-10 px-20 rounded-200 bg-dark-1 lh-16 text-white"
            >
              See all photos
            </span>
          </div>
          {/* <a
            href="/img/Trips-1.jpg"
            className="js-gallery"
            data-gallery="gallery1"
          ></a>
          <a
             href="/img/Trips-1.jpg"
            className="js-gallery"
            data-gallery="gallery1"
          ></a>
          <a
          href="/img/Trips-1.jpg"
            className="js-gallery"
            data-gallery="gallery1"
          ></a> */}
        </div>
      </div>
      <ImageLightBox
        images={tourData}
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </>
  );
}
