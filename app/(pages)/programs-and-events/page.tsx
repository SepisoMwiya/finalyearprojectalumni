import React from "react";
import Events from "@/components/events";
import LatestNews from "@/components/latest-news";
import PhotoGallery from "@/components/photo-gallery";

function ProgramsAndEventsPage() {
  return (
    <>
      <Events />
      <div className="container mt-10 flex">
        <LatestNews />
        <PhotoGallery />
      </div>
    </>
  );
}

export default ProgramsAndEventsPage;
