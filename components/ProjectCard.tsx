import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link from Next.js

import Image from "next/image";
import { HandCoins, Calendar, Target } from "lucide-react";
import { Project } from "@prisma/client";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/project/${project.id}`} passHref>
      <Card className="flex flex-col w-100 h-[450px] bg-white transition-transform transform hover:scale-105">
        {" "}
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={
                project.imageUrl ||
                "https://plus.unsplash.com/premium_photo-1683749808307-e5597ac69f1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              layout="fill"
              objectFit="cover"
              alt={project.title}
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
              {project.status}
            </div>
          </div>
          <CardTitle className="text-md font-bold mt-4 px-4">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden px-4">
          <CardDescription className="line-clamp-3">
            {project.description}
          </CardDescription>
          {project.startDate && (
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                Start Date: {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {project.fundingGoal && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Target className="w-4 h-4 mr-2" />
              <span>Goal: K{project.fundingGoal.toLocaleString()}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between mt-auto">
          <Button className="bg-red-400 text-white flex items-center w-[230px] relative">
            <HandCoins className="w-4 h-4 absolute left-4" />
            Donate{" "}
            {/* <Button variant="link" className="text-secondary">
            Learn More
          </Button> */}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProjectCard;
