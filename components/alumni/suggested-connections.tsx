"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Users, Briefcase, School } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

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

export default function SuggestedConnections() {
  const [suggestedAlumni, setSuggestedAlumni] = useState<SuggestedAlumni[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await fetch("/api/alumni/suggested");
        if (!response.ok) throw new Error("Failed to fetch suggestions");
        const data = await response.json();
        setSuggestedAlumni(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        toast({
          title: "Error",
          description: "Failed to load suggested connections",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchSuggestions();
  }, []);

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
        throw new Error("Failed to send connection request");
      }

      toast({
        title: "Success",
        description: "Connection request sent successfully",
      });

      // Remove the connected alumni from suggestions
      setSuggestedAlumni(prev => prev.filter(alumni => alumni.id !== alumniId));
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading suggestions...</div>;
  }

  if (suggestedAlumni.length === 0) {
    return null;
  }

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
              <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
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
                      {alumni.role && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Briefcase className="h-4 w-4" />
                          <span>{alumni.role}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <School className="h-4 w-4" />
                        <span>{alumni.school}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Badge variant="secondary" className="w-full justify-center">
                      {alumni.reasonForSuggestion}
                    </Badge>
                    <p className="text-sm text-gray-600 text-center">
                      {alumni.commonConnections} mutual connections
                    </p>
                  </div>

                  <Button 
                    className="w-full mt-4"
                    onClick={() => handleConnect(alumni.id)}
                  >
                    Connect
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
