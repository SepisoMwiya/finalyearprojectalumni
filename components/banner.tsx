import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Banner() {
  return (
    <div className="h-[380px] container">
      <div className="bg-banner-background bg-cover bg-center h-full container flex flex-col gap-6 items-center justify-center relative">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <h1 className="text-white text-5xl z-10 relative text-center">
          <span className="font-bold">Join The UNZA Alumni Network</span> And
          Make A Difference
        </h1>
        <p className="text-white font-light text-sm z-10 relative text-center max-w-2xl">
          Connect with fellow graduates, support current students, and
          contribute to the growth of the University of Zambia. Together, we can
          shape the future of education and create lasting impact.
        </p>
        <div className="z-10 flex gap-4">
          <Button
            variant="default"
            className="bg-red-600 rounded-sm font-bold hover:bg-secondary"
          >
            <Link href="/donate">Make A Donation</Link>
          </Button>
          <Button className="rounded-sm bg-white text-primary font-bold hover:bg-secondary hover:text-white">
            <Link href="/sign-up">Join The Network</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
