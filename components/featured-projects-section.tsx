"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";

interface FeaturedProjectsSectionProps {
  initialProjects: Project[];
}

function FeaturedProjectsSection({
  initialProjects,
}: FeaturedProjectsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container flex flex-col gap-2 mt-10">
      <div className="text-center flex items-center flex-col gap-2">
        <h2 className="text-xl font-bold">Get Involved - Featured Projects</h2>
        <p className="font-sm text-sm text-gray-600 max-w-2xl mx-auto">
          Discover and support impactful University projects shaping
          education&apos;s future. Your involvement can advance research,
          improve facilities, and enhance student experiences at UNZA.
        </p>
      </div>
      <div className="relative bg-gray-200 p-4 mt-4">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 items-center justify-start overflow-x-hidden mb-12"
        >
          {initialProjects.slice(0, 10).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
          <Button
            onClick={() => scroll("left")}
            className="bg-orange-400 text-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-orange-400"
          >
            <ChevronLeft className="w-6 h-4" />
          </Button>
          <Button
            onClick={() => scroll("right")}
            className="bg-orange-400 text-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-orange-400"
          >
            <ChevronRight className="w-6 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProjectsSection;
