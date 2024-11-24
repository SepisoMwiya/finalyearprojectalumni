import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ProfileHeader from "@/components/alumni/profile/profile-header";
import ProfileSidebar from "@/components/alumni/profile/profile-sidebar";
import ProfileTabs from "@/components/alumni/profile/profile-tabs";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

async function getAlumniProfile(id: string) {
  const profile = await db.alumni.findUnique({
    where: { id: parseInt(id) },
    include: {
      skills: true,
      experiences: {
        orderBy: {
          startDate: "desc",
        },
      },
      achievements: {
        orderBy: {
          date: "desc",
        },
      },
      posts: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          comments: true,
          likes: true,
        },
      },
      projects: true,
      sentConnections: {
        include: {
          toAlumni: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              jobTitle: true,
              currentCompany: true,
              profileImage: true,
            },
          },
        },
        where: {
          status: "accepted",
        },
      },
      receivedConnections: {
        include: {
          fromAlumni: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              jobTitle: true,
              currentCompany: true,
              profileImage: true,
            },
          },
        },
        where: {
          status: "accepted",
        },
      },
    },
  });

  if (!profile) return null;

  // Combine and format connections
  const connections = [
    ...profile.sentConnections.map((conn) => ({
      id: conn.id,
      alumni: conn.toAlumni,
      status: conn.status,
      createdAt: conn.createdAt,
    })),
    ...profile.receivedConnections.map((conn) => ({
      id: conn.id,
      alumni: conn.fromAlumni,
      status: conn.status,
      createdAt: conn.createdAt,
    })),
  ];

  return {
    ...profile,
    connections,
  };
}

async function getConnectionStatus(profileId: string, currentUserId?: string) {
  if (!currentUserId) return "none";

  const connection = await db.connection.findFirst({
    where: {
      OR: [
        {
          fromAlumniId: parseInt(currentUserId),
          toAlumniId: parseInt(profileId),
        },
        {
          fromAlumniId: parseInt(profileId),
          toAlumniId: parseInt(currentUserId),
        },
      ],
    },
  });

  return connection ? connection.status : "none";
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await currentUser();
  const profile = await getAlumniProfile(params.id);

  if (!profile) {
    notFound();
  }

  // Get the current user's alumni record
  const currentUserAlumni = user?.emailAddresses[0]?.emailAddress
    ? await db.alumni.findFirst({
        where: { email: user.emailAddresses[0].emailAddress },
      })
    : null;

  const isOwnProfile = user?.emailAddresses[0]?.emailAddress === profile.email;
  const currentUserId = currentUserAlumni?.id.toString();

  const connectionStatus = await getConnectionStatus(params.id, currentUserId);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <ProfileHeader
            profile={profile}
            isOwnProfile={isOwnProfile}
            currentUserId={currentUserId}
            connectionStatus={connectionStatus}
          />
          <ProfileTabs profile={profile} isOwnProfile={isOwnProfile} />
        </div>
        <div className="lg:col-span-1">
          <ProfileSidebar profile={profile} isOwnProfile={isOwnProfile} />
        </div>
      </div>
    </div>
  );
}
