"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, MapPin, Building, Mail, Linkedin, Globe } from "lucide-react";

import { Alumni } from "@prisma/client";
import EditProfileModal from "./edit-profile-modal";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/dist/client/components/navigation";
import ConnectionButton from "./connection-button";
import { db } from "@/lib/prisma";

interface ProfileHeaderProps {
  profile: Alumni & {
    receivedConnections: Array<{
      id: number;
      status: "pending" | "connected";
      fromAlumniId: number;
      toAlumniId: number;
      alumni: {
        id: number;
        firstName: string;
        lastName: string;
      };
    }>;
  };
  isOwnProfile: boolean;
  currentUserId?: string;
}

interface ProfileHeaderProps {
  profile: Alumni & {
    receivedConnections: Array<{
      id: number;
      status: "pending" | "connected";
      fromAlumniId: number;
      toAlumniId: number;
      alumni: {
        id: number;
        firstName: string;
        lastName: string;
      };
    }>;
  };
  isOwnProfile: boolean;
  currentUserId?: string;
  connectionStatus: "none" | "pending" | "connected";
}

export default function ProfileHeader({
  profile,
  isOwnProfile,
  currentUserId,
  connectionStatus,
}: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  const params = useParams();

  const handleConnect = async () => {
    if (!currentUserId) {
      toast({
        title: "Please sign in to connect with alumni",
      });
      return;
    }

    try {
      setIsConnecting(true);
      const response = await fetch("/api/connections/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toAlumniId: profile.id }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "Connection request sent successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed to send connection request",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send connection request",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const renderConnectionButton = () => {
    if (isOwnProfile) {
      return (
        <Button onClick={() => setIsEditModalOpen(true)}>Edit Profile</Button>
      );
    }

    return (
      <ConnectionButton
        profileId={profile.id}
        connectionStatus={connectionStatus}
        isOwnProfile={isOwnProfile}
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-32 h-32">
          <Image
            src={profile.imageUrl || "/default-avatar.png"}
            alt={`${profile.firstName} ${profile.lastName}`}
            fill
            className="rounded-full object-cover"
          />
          {isOwnProfile && (
            <Button
              size="sm"
              className="absolute bottom-0 right-0"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                {profile.firstName} {profile.lastName}
              </h1>
              {profile.jobTitle && profile.currentCompany && (
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Building className="w-4 h-4" />
                  <span>
                    {profile.jobTitle} at {profile.currentCompany}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {profile.city ? `${profile.city}, ` : ""}
                  {profile.country}
                </span>
              </div>
            </div>

            {renderConnectionButton()}
          </div>

          <div className="mt-4">
            <p className="text-gray-700">{profile.bio}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{profile.school}</Badge>
            <Badge variant="secondary">{profile.course}</Badge>
            <Badge variant="secondary">Class of {profile.graduationYear}</Badge>
          </div>

          <div className="mt-4 flex gap-4">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-gray-600 hover:text-primary"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
            {profile.linkedInUrl && (
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
        />
      )}
    </div>
  );
}
