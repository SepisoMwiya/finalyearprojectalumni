import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";

interface Resource {
  id: number;
  title: string;
  type: "video" | "document" | "course";
  description: string;
  tags: string[];
  link: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Resume Writing Masterclass",
    type: "video",
    description:
      "Learn how to craft a compelling resume that stands out to employers.",
    tags: ["Resume", "Career Tips"],
    link: "#",
  },
  {
    id: 2,
    title: "Interview Preparation Guide",
    type: "document",
    description: "Comprehensive guide to ace your job interviews.",
    tags: ["Interview", "Career Tips"],
    link: "#",
  },
  {
    id: 3,
    title: "Professional Networking Course",
    type: "course",
    description: "Master the art of building professional relationships.",
    tags: ["Networking", "Professional Development"],
    link: "#",
  },
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="h-5 w-5" />;
    case "document":
      return <FileText className="h-5 w-5" />;
    case "course":
      return <BookOpen className="h-5 w-5" />;
    default:
      return null;
  }
};

export default function CareerResources() {
  return (
    <section className="my-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Career Development Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card
                key={resource.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {getResourceIcon(resource.type)}
                    <h3 className="font-semibold">{resource.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      {resource.type === "document" ? (
                        <>
                          <Download className="h-4 w-4 mr-2" /> Download
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" /> Access
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
