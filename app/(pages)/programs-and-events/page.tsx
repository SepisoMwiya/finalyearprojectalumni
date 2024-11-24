import React from "react";
import Events from "@/components/events";
import LatestNews from "@/components/latest-news";
import PhotoGallery from "@/components/photo-gallery";
import { db } from "@/lib/prisma";

async function ProgramsAndEventsPage() {
  // Fetch published news and events
  const [news, events] = await Promise.all([
    db.content.findMany({
      where: {
        type: "news",
        status: "published",
      },
      orderBy: {
        date: "desc",
      },
    }),
    db.content.findMany({
      where: {
        type: "event",
        status: "published",
      },
      orderBy: {
        date: "desc",
      },
    }),
  ]);

  return (
    <>
      <Events events={events} />
      <div className="container mt-10 flex">
        <LatestNews news={news} />
        <PhotoGallery />
      </div>
    </>
  );
}

export default ProgramsAndEventsPage;
