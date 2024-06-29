import React, { useState } from "react";
import Sidebar from "../Sidebar";
 
import Header from "../Header";

export default function DBMain() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">Dashboard</h1>
            <p className="">Lorem ipsum dolor sit amet, consectetur.</p> 

            <div className="text-center pt-30">
              © Copyright Valtech {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
