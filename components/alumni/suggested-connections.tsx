import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Users, Briefcase, School } from "lucide-react";

interface SuggestedAlumni {
  id: number;
  name: string;
  imageUrl: string;
  role: string;
  company: string;
  school: string;
  commonConnections: number;
  reasonForSuggestion: string;
}

const suggestedAlumni: SuggestedAlumni[] = [
  {
    id: 1,
    name: "Dr. Chilufya Mulenga",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Chief Medical Officer",
    company: "University Teaching Hospital",
    school: "School of Medicine",
    commonConnections: 15,
    reasonForSuggestion: "From your school",
  },
  {
    id: 2,
    name: "Prof. Namwinga Chintu",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "Dean",
    company: "UNZA School of Business",
    school: "School of Business",
    commonConnections: 23,
    reasonForSuggestion: "Common connections",
  },
];

export default function SuggestedConnections() {
  return (
    <section className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            People You May Know
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedAlumni.map((alumni) => (
              <Card
                key={alumni.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={alumni.imageUrl}
                      alt={alumni.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{alumni.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="h-4 w-4" />
                        <span>{alumni.role}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <School className="h-4 w-4" />
                        <span>{alumni.school}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Badge
                      variant="secondary"
                      className="w-full justify-center"
                    >
                      {alumni.reasonForSuggestion}
                    </Badge>
                    <p className="text-sm text-gray-600 text-center">
                      {alumni.commonConnections} mutual connections
                    </p>
                  </div>

                  <Button className="w-full mt-4">Connect</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
