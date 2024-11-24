import React from "react";
import Events from "@/components/events";
import LatestNews from "@/components/latest-news";
import PhotoGallery from "@/components/photo-gallery";
import { db } from "@/lib/prisma";
import { isAfter } from "date-fns";

async function ProgramsAndEventsPage() {
  const now = new Date();

  // Fetch published news and events
  const [news, featuredEvent, upcomingEvents] = await Promise.all([
    db.content.findMany({
      where: {
        type: "news",
        status: "published",
      },
      orderBy: {
        date: "desc",
      },
    }),
    db.content.findFirst({
      where: {
        type: "event",
        status: "featured",
      },
      orderBy: {
        date: "asc",
      },
    }),
    db.content.findMany({
      where: {
        type: "event",
        OR: [{ status: "published" }, { status: "scheduled" }],
        date: {
          gte: now,
        },
      },
      orderBy: {
        date: "asc",
      },
      take: 4,
    }),
  ]);

  return (
    <>
      <Events featuredEvent={featuredEvent} upcomingEvents={upcomingEvents} />
      <div className="container mt-10 flex">
        <LatestNews news={news} />
        <PhotoGallery />
      </div>
    </>
  );
}

export default ProgramsAndEventsPage;
