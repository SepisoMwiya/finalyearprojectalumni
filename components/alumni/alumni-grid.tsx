"use client";

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
  User,
} from "lucide-react";
import { db } from "@/lib/prisma";
import { toast, useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AlumniProps {
  alumni: Array<{
    id: number;
    firstName: string;
    lastName: string;
    graduationYear: number;
    school: string;
    course: string;
    currentCompany?: string | null;
    jobTitle?: string | null;
    country: string;
    city?: string | null;
    connectionStatus?: "none" | "pending" | "connected";
  }>;
  currentUserId?: string;
}

export default function AlumniGrid({ alumni, currentUserId }: AlumniProps) {
  const router = useRouter();

  const handleConnect = async (alumniId: number) => {
    try {
      const response = await fetch("/api/connections/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toAlumniId: alumniId }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "Success",
        description: "Connection request sent successfully",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send connection request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {alumni.map((person) => (
        <Card key={person.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <a href={`/alumni/${person.id}`}>
                    <h3 className="font-semibold text-lg hover:text-blue-600">
                      {person.firstName} {person.lastName}
                    </h3>
                  </a>
                  {currentUserId && currentUserId !== person.id.toString() && (
                    <div className="mt-4">
                      {person.connectionStatus === "none" && (
                        <Button
                          onClick={() => handleConnect(person.id)}
                          variant="outline"
                          size="sm"
                        >
                          Connect
                        </Button>
                      )}
                      {person.connectionStatus === "pending" && (
                        <Button disabled variant="outline" size="sm">
                          Pending
                        </Button>
                      )}
                      {person.connectionStatus === "connected" && (
                        <Badge variant="outline">Connected</Badge>
                      )}
                    </div>
                  )}
                </div>
                {person.jobTitle && person.currentCompany && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="h-4 w-4" />
                    <span>
                      {person.jobTitle} at {person.currentCompany}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {person.city ? `${person.city}, ` : ""}
                    {person.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                <span>
                  {person.school} - {person.course} ({person.graduationYear})
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <a href={`/alumni/${person.id}`}>
                  <Button size="sm">View Profile</Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
