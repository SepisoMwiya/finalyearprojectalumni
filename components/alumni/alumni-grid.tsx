import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  MapPin,
  Building,
  GraduationCap,
  Link as LinkIcon,
} from "lucide-react";

interface Alumni {
  id: number;
  name: string;
  imageUrl: string;
  graduationYear: number;
  school: string;
  program: string;
  currentRole: string;
  company: string;
  location: string;
  skills: string[];
  connections: number;
}

const mockAlumni: Alumni[] = [
  {
    id: 1,
    name: "Dr. Mulenga Kapwepwe",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    graduationYear: 2010,
    school: "School of Medicine",
    program: "Medicine & Surgery",
    currentRole: "Chief Medical Officer",
    company: "University Teaching Hospital",
    location: "Lusaka, Zambia",
    skills: ["Healthcare", "Leadership", "Research"],
    connections: 500,
  },
  // Add more mock alumni...
];

export default function AlumniGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockAlumni.map((alumni) => (
        <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Image
                src={alumni.imageUrl}
                alt={alumni.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{alumni.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building className="h-4 w-4" />
                  <span>{alumni.currentRole}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{alumni.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                <span>
                  {alumni.school} - {alumni.program} ({alumni.graduationYear})
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {alumni.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">
                {alumni.connections} connections
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                <Button size="sm">View Profile</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
