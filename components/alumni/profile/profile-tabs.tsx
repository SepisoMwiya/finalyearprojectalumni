"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Briefcase,
  Users,
  GraduationCap,
  Edit,
  Plus,
  User,
} from "lucide-react";
import { Alumni } from "@prisma/client";
import AddExperienceModal from "./add-experience-modal";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface ProfileTabsProps {
  profile: Alumni;
  isOwnProfile: boolean;
}

export default function ProfileTabs({
  profile,
  isOwnProfile,
}: ProfileTabsProps) {
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] =
    useState(false);

  return (
    <Tabs defaultValue="experience" className="mt-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="experience" className="flex gap-2">
          <Briefcase className="h-4 w-4" />
          Experience
        </TabsTrigger>
        <TabsTrigger value="education" className="flex gap-2">
          <GraduationCap className="h-4 w-4" />
          Education
        </TabsTrigger>
        <TabsTrigger value="connections" className="flex gap-2">
          <Users className="h-4 w-4" />
          Connections
        </TabsTrigger>
      </TabsList>

      <TabsContent value="experience">
        <Card className="p-6">
          {isOwnProfile && (
            <div className="mb-6">
              <Button onClick={() => setIsAddExperienceModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
          )}

          <div className="space-y-6">
            {profile.experiences?.map((experience) => (
              <div key={experience.id} className="border-b pb-6 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600">{experience.company}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(experience.startDate).toLocaleDateString()} -
                      {experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString()
                        : "Present"}
                    </p>
                    <p className="mt-2">{experience.description}</p>
                  </div>
                  {isOwnProfile && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="education">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="border-b pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{profile.school}</h3>
                  <p className="text-gray-600">{profile.course}</p>
                  <p className="text-sm text-gray-500">
                    Class of {profile.graduationYear}
                  </p>
                </div>
                {isOwnProfile && (
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="connections">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.connections.map((connection: any) => (
              <Card key={connection.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    {connection.alumni.profileImage ? (
                      <Image
                        src={
                          connection.alumni.profileImage ||
                          "/default-avatar.png"
                        }
                        alt={`${connection.alumni.firstName} ${connection.alumni.lastName}`}
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {connection.alumni.firstName} {connection.alumni.lastName}
                    </h3>
                    {connection.alumni.jobTitle &&
                      connection.alumni.currentCompany && (
                        <p className="text-sm text-gray-600">
                          {connection.alumni.jobTitle} at{" "}
                          {connection.alumni.currentCompany}
                        </p>
                      )}
                    <p className="text-xs text-gray-500">
                      Connected{" "}
                      {formatDistanceToNow(new Date(connection.createdAt))} ago
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </TabsContent>

      <AddExperienceModal
        isOpen={isAddExperienceModalOpen}
        onClose={() => setIsAddExperienceModalOpen(false)}
        alumniId={profile.id}
        onExperienceAdded={() => {
          setIsAddExperienceModalOpen(false);
        }}
      />
    </Tabs>
  );
}
