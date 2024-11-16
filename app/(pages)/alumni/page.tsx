import React from "react";
import AlumniSearch from "@/components/alumni/alumni-search";
import AlumniGrid from "@/components/alumni/alumni-grid";
import AlumniStats from "@/components/alumni/alumni-stats";
import SuggestedConnections from "@/components/alumni/suggested-connections";
import AlumniFilters from "@/components/alumni/alumni-filters";
import { db } from "@/lib/prisma";
import {
  Users,
  Award,
  Building,
  GraduationCap,
  Globe,
  Briefcase,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";

async function getAlumniStats() {
  const totalAlumni = await db.alumni.count();
  const countries = await db.alumni.groupBy({
    by: ["country"],
  });

  return {
    totalAlumni,
    totalCountries: countries.length,
  };
}

async function getAlumni(searchQuery?: string, currentUserId?: string) {
  const whereClause = searchQuery
    ? {
        OR: [
          { firstName: { contains: searchQuery } },
          { lastName: { contains: searchQuery } },
          { currentCompany: { contains: searchQuery } },
          { school: { contains: searchQuery } },
          { country: { contains: searchQuery } },
          { city: { contains: searchQuery } },
        ],
      }
    : {};

  const alumni = await db.alumni.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sentConnections: true,
      receivedConnections: true,
    },
  });

  // If there's a current user, determine connection status for each alumni
  if (currentUserId) {
    return alumni.map((person) => {
      const sentConnection = person.sentConnections.find(
        (conn) => conn.toAlumniId.toString() === currentUserId
      );
      const receivedConnection = person.receivedConnections.find(
        (conn) => conn.fromAlumniId.toString() === currentUserId
      );

      const connection = sentConnection || receivedConnection;

      return {
        ...person,
        connectionStatus: connection ? connection.status : "none",
      };
    });
  }

  return alumni;
}

export default async function AlumniPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { userId } = auth();
  const { totalAlumni, totalCountries } = await getAlumniStats();

  // Get current alumni ID if user is logged in
  let currentAlumniId: string | null = null;
  if (userId) {
    const currentAlumni = await db.alumni.findFirst({
      where: { email: userId },
    });
    if (currentAlumni) {
      currentAlumniId = currentAlumni.id.toString();
    }
  }

  const alumni = await getAlumni(searchParams.q, currentAlumniId);

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: `${totalAlumni}+`,
      label: "Active Alumni",
      description: "Worldwide network",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: `${totalCountries}+`,
      label: "Countries",
      description: "Global presence",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      value: "75%",
      label: "Employment Rate",
      description: "Within 6 months",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "500+",
      label: "Industry Leaders",
      description: "In various sectors",
    },
    {
      icon: <Building className="w-8 h-8" />,
      value: "1,000+",
      label: "Companies",
      description: "Founded by alumni",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      value: "12",
      label: "Schools",
      description: "Academic diversity",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">UNZA Alumni Network</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with fellow graduates, discover opportunities, and stay
          engaged with the UNZA community. Our alumni network spans across the
          globe, making meaningful impacts in various industries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.slice(0, 6).map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-green-700">
                {stat.value}
              </h3>
              <p className="font-semibold mt-2">{stat.label}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <AlumniSearch />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <AlumniFilters />
        </div>
        <div className="lg:col-span-3">
          <AlumniGrid alumni={alumni} currentUserId={currentAlumniId} />
        </div>
      </div>
      <SuggestedConnections />
    </div>
  );
}
