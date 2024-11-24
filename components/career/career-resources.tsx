import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";
import { db } from "@/lib/prisma";
import ResourceButton from "./resource-button";

interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  url: string;
  category: string;
}

const getResourceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "video":
      return <Video className="h-5 w-5" />;
    case "document":
      return <FileText className="h-5 w-5" />;
    case "link":
      return <ExternalLink className="h-5 w-5" />;
    default:
      return <BookOpen className="h-5 w-5" />;
  }
};

async function CareerResources() {
  const resources = await db.careerResource.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
            {resources.map((resource: Resource) => (
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
                    <Badge variant="secondary">{resource.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <ResourceButton type={resource.type} url={resource.url} />
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

export default CareerResources;
