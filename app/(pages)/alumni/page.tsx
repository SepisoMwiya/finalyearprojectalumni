import React from "react";
import AlumniSearch from "@/components/alumni/alumni-search";
import AlumniGrid from "@/components/alumni/alumni-grid";
import AlumniStats from "@/components/alumni/alumni-stats";
import SuggestedConnections from "@/components/alumni/suggested-connections";
import AlumniFilters from "@/components/alumni/alumni-filters";
import {
  Users,
  Award,
  Building,
  GraduationCap,
  Globe,
  Briefcase,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function AlumniPage() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "10,000+",
      label: "Active Alumni",
      description: "Worldwide network",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "50+",
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
    <div className="container py-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <AlumniFilters />
        </div>
        <div className="lg:col-span-3">
          <AlumniSearch />
          <AlumniGrid />
        </div>
      </div>

      <SuggestedConnections />
    </div>
  );
}

export default AlumniPage;
