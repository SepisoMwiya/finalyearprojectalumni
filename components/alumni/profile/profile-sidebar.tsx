"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Linkedin, Award, BookOpen, MapPin } from "lucide-react";
import { Alumni, Skill, Achievement, Mentor } from "@prisma/client";
import AddSkillModal from "./add-skill-modal";
import AddAchievementModal from "./add-achievement-modal";
import { useRouter } from "next/navigation";

interface ProfileSidebarProps {
  profile: Alumni & {
    skills: Skill[];
    achievements: Achievement[];
    connections: any[];
    mentor: Mentor | null;
  };
  isOwnProfile: boolean;
}

export default function ProfileSidebar({
  profile,
  isOwnProfile,
}: ProfileSidebarProps) {
  const router = useRouter();
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [isAddAchievementModalOpen, setIsAddAchievementModalOpen] =
    useState(false);
  const [connections, setConnections] = useState(0);
  const [schoolmates, setSchoolmates] = useState(0);

  const handleSkillAdded = () => {
    router.refresh();
  };

  const handleAchievementAdded = () => {
    router.refresh();
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(`/api/alumni/${profile.id}/connections`);
        if (!response.ok) throw new Error("Failed to fetch connections");
        const count = await response.json();
        setConnections(count);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    const fetchSchoolmates = async () => {
      try {
        const response = await fetch(`/api/alumni/${profile.id}/schoolmates`);
        if (!response.ok) throw new Error("Failed to fetch schoolmates");
        const count = await response.json();
        setSchoolmates(count);
      } catch (error) {
        console.error("Error fetching schoolmates:", error);
      }
    };

    fetchConnections();
    fetchSchoolmates();
  }, [profile.id]);

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <a
                href={`mailto:${profile.email}`}
                className="text-sm hover:underline"
              >
                {profile.email}
              </a>
            </div>
          )}
          {profile.linkedInUrl && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-gray-500" />
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {profile.city ? `${profile.city}, ` : ""}
              {profile.country}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Skills & Expertise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
          {isOwnProfile && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full"
              onClick={() => setIsAddSkillModalOpen(true)}
            >
              Add Skills
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {profile.achievements.map((achievement) => (
              <li
                key={achievement.id}
                className="text-sm flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                {achievement.title}
              </li>
            ))}
          </ul>
          {isOwnProfile && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full"
              onClick={() => setIsAddAchievementModalOpen(true)}
            >
              Add Achievement
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Connection Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-4 w-4" />
            Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Connections</span>
              <span className="font-semibold">{connections}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">School Mates</span>
              <span className="font-semibold">{schoolmates}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Same Industry</span>
              <span className="font-semibold">
                {
                  profile.connections.filter(
                    (conn) =>
                      conn.alumni.currentCompany &&
                      profile.currentCompany &&
                      conn.alumni.currentCompany === profile.currentCompany
                  ).length
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {isOwnProfile && !profile.mentor && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mentorship</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Share your experience and help guide fellow alumni in their career
              journey.
            </p>
            <Button
              className="w-full"
              onClick={() => router.push("/mentorship/become-mentor")}
            >
              Become a Mentor
            </Button>
          </CardContent>
        </Card>
      )}

      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        alumniId={profile.id}
        onSkillAdded={handleSkillAdded}
      />

      <AddAchievementModal
        isOpen={isAddAchievementModalOpen}
        onClose={() => setIsAddAchievementModalOpen(false)}
        alumniId={profile.id}
        onAchievementAdded={handleAchievementAdded}
      />
    </div>
  );
}
