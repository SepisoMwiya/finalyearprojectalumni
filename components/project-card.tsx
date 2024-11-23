import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  readMoreLink: string;
  status: string;
}

function ProjectCard({
  image,
  title,
  description,
  readMoreLink,
  status,
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-blue-500";
      case "completed":
        return "bg-green-700";
      case "upcoming":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge
          className={`absolute top-2 right-2 ${getStatusColor(
            status
          )} text-white`}
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge className={`${getStatusColor(status)} text-white mr-2`}>
          {status}
        </Badge>
        <div className="flex">
          <Button variant="outline" asChild className="mr-2">
            <Link href={readMoreLink}>Read More</Link>
          </Button>
          <Link href="https://donate.stripe.com/test_9AQ8xQbJx4Spdu84gg">
            <Button>Donate</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
