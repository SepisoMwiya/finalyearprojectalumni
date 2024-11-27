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
import { getSchools } from "@/lib/get-schools";

async function getAlumniStats() {
  const totalAlumni = await db.alumni.count();
  const countries = await db.alumni.groupBy({
    by: ["country"],
  });
  const totalSchools = await db.alumni.groupBy({
    by: ["school"],
  });

  return {
    totalAlumni,
    totalCountries: countries.length,
    totalSchools: totalSchools.length,
  };
}

async function getAlumni(
  searchQuery?: string,
  currentUserId?: string,
  filters?: {
    schools?: string[];
    years?: string[];
    locations?: string[];
  }
) {
  const whereClause: any = {};

  // Handle search query
  if (searchQuery) {
    whereClause.OR = [
      { firstName: { contains: searchQuery } },
      { lastName: { contains: searchQuery } },
      { currentCompany: { contains: searchQuery } },
      { school: { contains: searchQuery } },
      { country: { contains: searchQuery } },
      { city: { contains: searchQuery } },
    ];
  }

  // Handle filters
  if (filters) {
    const conditions: any[] = [];

    if (filters.schools?.length) {
      conditions.push({
        school: { in: filters.schools },
      });
    }

    if (filters.years?.length) {
      // Handle graduation year ranges
      const yearRanges = filters.years
        .map((range) => {
          switch (range) {
            case "2020-2024":
              return { graduationYear: { gte: 2020, lte: 2024 } };
            case "2015-2019":
              return { graduationYear: { gte: 2015, lte: 2019 } };
            case "2010-2014":
              return { graduationYear: { gte: 2010, lte: 2014 } };
            case "Before 2010":
              return { graduationYear: { lt: 2010 } };
            default:
              return null;
          }
        })
        .filter(Boolean);

      if (yearRanges.length) {
        conditions.push({ OR: yearRanges });
      }
    }

    if (filters.locations?.length) {
      conditions.push({
        OR: [
          { city: { in: filters.locations } },
          { country: { in: filters.locations } },
        ],
      });
    }

    if (conditions.length > 0) {
      whereClause.AND = conditions;
    }
  }

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
  searchParams: {
    q?: string;
    schools?: string;
    years?: string;
    locations?: string;
  };
}) {
  const { userId } = auth();
  const { totalAlumni, totalCountries, totalSchools } = await getAlumniStats();

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

  // Parse filter parameters
  const filters = {
    schools: searchParams.schools?.split(","),
    years: searchParams.years?.split(","),
    locations: searchParams.locations?.split(","),
  };

  const alumni = await getAlumni(searchParams.q, currentAlumniId, filters);

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
      icon: <GraduationCap className="w-8 h-8" />,
      value: `${totalSchools}+`,
      label: "Schools",
      description: "Academic diversity",
    },
  ];

  const schools = await getSchools();

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
          <AlumniFilters schools={schools} />
        </div>
        <div className="lg:col-span-3">
          <AlumniGrid alumni={alumni} currentUserId={currentAlumniId} />
        </div>
      </div>
      <SuggestedConnections />
    </div>
  );
}
