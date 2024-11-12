import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Users, Star, Briefcase, Calendar } from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  rating: number;
  experience: string;
  availability: string;
  imageUrl: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Sarah Mwanza",
    role: "Senior Software Engineer",
    company: "Microsoft",
    expertise: ["Technology", "Career Development", "Leadership"],
    rating: 4.9,
    experience: "15+ years",
    availability: "2 slots available",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  // Add more mentors...
];

export default function MentorshipSection() {
  return (
    <section className="my-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Connect with Alumni Mentors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card
                key={mentor.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.role}</p>
                      <p className="text-sm text-gray-600">{mentor.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{mentor.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4" />
                      <span>{mentor.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{mentor.availability}</span>
                    </div>
                  </div>
                  <Button className="w-full">Request Mentorship</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
