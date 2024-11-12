"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Building, Clock } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  skills: string[];
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Corp Zambia",
    location: "Lusaka",
    type: "Full-time",
    salary: "K25,000 - K35,000",
    posted: "2 days ago",
    description: "Looking for a skilled software engineer...",
    skills: ["React", "Node.js", "TypeScript"],
  },
  // Add more mock jobs...
];

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <section className="my-12">
      <Card>
        <CardHeader>
          <CardTitle>Latest Job Opportunities</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                      <MapPin className="h-4 w-4 ml-2" />
                      <span>{job.location}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  <Badge>{job.type}</Badge>
                </div>
                <p className="mt-3 text-gray-600">{job.description}</p>
                <div className="mt-4 flex gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-green-700 font-semibold">
                    {job.salary}
                  </span>
                  <Button>Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
