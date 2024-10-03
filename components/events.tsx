"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Events() {
  return (
    <div className="container flex items-center justify-between gap-4 h-[510px]">
      {/* Featured Event */}
      <div className="relative flex flex-col items-center w-full h-full rounded-md">
        <Image
          src="https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="UNZA Alumni Dinner"
          width={1000}
          height={500}
          className="object-cover h-64 w-full flex-1 rounded-md"
        />
        <div className="p-6 absolute bottom-0 right-0 left-0 bg-primary rounded-b-md h-[130px] py-4 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-orange-400">24 Dec 2024</p>
            <div>
              <h3 className="text-2xl font-bold text-white">
                UNZA Alumni Dinner
              </h3>
              <p className="text-white text-sm">
                Join us for an elegant evening of dining
              </p>
            </div>
            <Link href="#" className="text-green-700 font-semibold">
              [More]
            </Link>
          </div>
          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-orange-400 text-white rounded-full p-2 hover:bg-gray-100 hover:text-orange-400">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button className="bg-orange-400 text-white rounded-full p-2 hover:bg-gray-100 hover:text-orange-400">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Upcoming Events Sidebar */}
      <div className="bg-green-700 text-white rounded-md p-4 w-[550px] h-full flex flex-col items-start justify-between">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <ul className="w-full flex flex-col gap-2">
          {/* Event Item */}
          {[...Array(3)].map((_, i) => (
            <li
              key={i}
              className="flex items-center gap-4 bg-white text-black rounded-md p-2"
            >
              <Image
                src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" // replace with actual image
                alt="Event"
                width={100}
                height={100}
                className="object-cover rounded-md "
              />
              <div>
                <p className="text-xs text-white bg-secondary font-bold w-fit rounded-md px-2 py-1">
                  24 Dec 2024
                </p>
                <h4 className="font-bold">UNZA Alumni Dinner</h4>
                <p className="text-xs">
                  Join us for an elegant evening of dining
                </p>
                <Link href="#" className="text-green-700 font-bold text-xs">
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
