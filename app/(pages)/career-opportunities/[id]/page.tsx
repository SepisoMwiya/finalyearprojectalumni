import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Building, MapPin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import ApplyButton from "./apply-button";

async function JobPage({ params }: { params: { id: string } }) {
  const job = await db.career.findUnique({
    where: {
      id: parseInt(params.id),
      status: "active",
    },
    include: {
      skills: true,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/career-opportunities"
        className="text-green-700 hover:text-green-800 mb-8 inline-flex items-center"
      >
        ← Back to Job Listings
      </Link>

      <Card className="mt-6 p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>
                  Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <Badge className="text-lg px-4 py-2">{job.type}</Badge>
        </div>

        <div className="border-t border-b py-6 my-6">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="text-md px-3 py-1">
                {skill.skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="text-2xl font-bold text-green-700">
            K {job.salary}
          </div>
          <ApplyButton applicationLink={job.applicationLink} />
        </div>
      </Card>
    </div>
  );
}

export default JobPage; 