"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Content } from "@prisma/client";
import { format } from "date-fns";

interface EventsProps {
  featuredEvent: Content | null;
  upcomingEvents: Content[];
}

export default function Events({ featuredEvent, upcomingEvents }: EventsProps) {
  return (
    <div className="container flex items-center justify-between gap-4 h-[510px]">
      {/* Featured Event */}
      {featuredEvent ? (
        <div className="relative flex flex-col items-center w-full h-full rounded-md">
          <Image
            src={featuredEvent.imageUrl}
            alt={featuredEvent.title}
            width={1000}
            height={500}
            className="object-cover h-64 w-full flex-1 rounded-md"
          />
          <div className="p-6 absolute bottom-0 right-0 left-0 bg-primary rounded-b-md h-[130px] py-4 flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-orange-400">
                {format(new Date(featuredEvent.date), "dd MMM yyyy")}
              </p>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {featuredEvent.title}
                </h3>
                <p className="text-white text-sm">{featuredEvent.description}</p>
              </div>
              <Link
                href={`/events/${featuredEvent.id}`}
                className="text-green-700 font-semibold"
              >
                [More]
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          No featured event at this time
        </div>
      )}

      {/* Upcoming Events Sidebar */}
      <div className="bg-green-700 text-white rounded-md p-4 w-[550px] h-full flex flex-col items-start justify-between">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <ul className="w-full flex flex-col gap-2">
          {upcomingEvents.map((event) => (
            <li
              key={event.id}
              className="flex items-center gap-4 bg-white text-black rounded-md p-2"
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={100}
                height={100}
                className="object-cover rounded-md"
              />
              <div>
                <p className="text-xs text-white bg-secondary font-bold w-fit rounded-md px-2 py-1">
                  {format(new Date(event.date), "dd MMM yyyy")}
                </p>
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-xs">{event.description}</p>
                <Link
                  href={`/events/${event.id}`}
                  className="text-green-700 font-bold text-xs"
                >
                  [More]
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {/* See All Events Button */}
        <div className="mt-4 text-center flex items-center justify-center gap-2 underline">
          <Link href="#" className=" text-white text-underline w-full py-2">
            See All Events
          </Link>
          <Button className="bg-orange-400 text-white rounded-full p-2 hover:bg-gray-100 hover:text-orange-400">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
