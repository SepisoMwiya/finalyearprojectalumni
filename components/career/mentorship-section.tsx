"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Users, Star, Briefcase, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Expertise {
  id: number;
  name: string;
}

interface Mentor {
  id: number;
  expertise: Expertise[];
  bio: string;
  hourlyRate: number | null;
  availability: string;
  rating: number;
  totalRatings: number;
  alumni: {
    firstName: string;
    lastName: string;
    currentCompany: string | null;
    jobTitle: string | null;
    school: string;
  };
}

export default function MentorshipSection() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await fetch("/api/mentors");
        if (!response.ok) throw new Error("Failed to fetch mentors");
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load mentors",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchMentors();
  }, [toast]);

  const handleRequestMentorship = async (mentorId: number) => {
    // Implement mentorship request logic
    router.push(`/mentorship/request/${mentorId}`);
  };

  if (isLoading) {
    return <div>Loading mentors...</div>;
  }

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
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {mentor.alumni.firstName} {mentor.alumni.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {mentor.alumni.jobTitle}
                      </p>
                      <p className="text-sm text-gray-600">
                        {mentor.alumni.currentCompany}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise?.map((exp: Expertise) => (
                      <Badge key={exp.id} variant="secondary">
                        {exp.name}
                      </Badge>
                    )) || null}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>
                        {mentor.rating.toFixed(1)} ({mentor.totalRatings}{" "}
                        ratings)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{mentor.availability}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleRequestMentorship(mentor.id)}
                  >
                    Request Mentorship
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
