"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Building, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface CareerSkill {
  id: number;
  skill: string;
  careerId: number;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  skills: CareerSkill[];
  status: string;
  postedDate: Date;
  applicationLink: string;
}

const ensureHttps = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

export default function JobListings({ careers }: { careers: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredJobs = careers.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || job.type === selectedType;

    return matchesSearch && matchesType;
  });

  const handleApplyClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    if (url) {
      window.open(ensureHttps(url), "_blank");
    }
  };

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
            {filteredJobs.map((job) => (
              <Link
                href={`/career-opportunities/${job.id}`}
                key={job.id}
                className="block"
              >
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                        <MapPin className="h-4 w-4 ml-2" />
                        <span>{job.location}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>
                          {formatDistanceToNow(new Date(job.postedDate), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <Badge>{job.type}</Badge>
                  </div>
                  <p className="mt-3 text-gray-600">{job.description}</p>
                  <div className="mt-4 flex gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill.id} variant="secondary">
                        {skill.skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-green-700 font-semibold">
                      K {job.salary}
                    </span>
                    <Button
                      onClick={(e) => handleApplyClick(e, job.applicationLink)}
                      disabled={!job.applicationLink}
                    >
                      {job.applicationLink ? "Apply Now" : "Applications Closed"}
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
