import React from "react";
import { Briefcase, BookOpen, Users, Trophy } from "lucide-react";
import JobListings from "@/components/career/job-listings";
import CareerResources from "@/components/career/career-resources";
import CareerStats from "@/components/career/career-stats";
import MentorshipSection from "@/components/career/mentorship-section";

function CareerOpportunitiesPage() {
  const stats = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      value: "2,500+",
      label: "Job Opportunities",
      description: "Posted annually",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "500+",
      label: "Active Mentors",
      description: "Ready to guide you",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      value: "85%",
      label: "Success Rate",
      description: "In job placements",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: "200+",
      label: "Career Resources",
      description: "Available online",
    },
  ];

  return (
    <div className="container mt-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Career Opportunities</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover exciting career opportunities, connect with industry mentors,
          and access valuable resources to advance your professional journey.
        </p>
      </div>

      <CareerStats stats={stats} />
      <JobListings />
      <CareerResources />
      <MentorshipSection />
    </div>
  );
}

export default CareerOpportunitiesPage;
