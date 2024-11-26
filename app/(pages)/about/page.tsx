import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, GraduationCap, HandHeart } from "lucide-react";

export default function AboutPage() {
  const objectives = [
    {
      title: "Alumni Engagement",
      description:
        "Foster active participation and meaningful connections within the UNZA alumni community through networking events, mentorship programs, and professional development opportunities.",
    },
    {
      title: "Resource Mobilization",
      description:
        "Facilitate transparent and accountable financial contributions to support university initiatives, scholarships, and infrastructure development.",
    },
    {
      title: "Knowledge Sharing",
      description:
        "Create platforms for alumni to share their expertise, experiences, and industry insights with current students and fellow graduates.",
    },
    {
      title: "Career Development",
      description:
        "Support career advancement through job postings, professional workshops, and networking opportunities exclusively for UNZA alumni.",
    },
    {
      title: "University Growth",
      description:
        "Contribute to UNZA's development by supporting research initiatives, facility improvements, and academic programs.",
    },
  ];

  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] mb-12">
        <Image
          src="https://images.pexels.com/photos/7713172/pexels-photo-7713172.jpeg"
          alt="UNZA Campus"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            About The UNZA Alumni Network
          </h1>
        </div>
      </div>

      {/* Mission Statement */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center leading-relaxed">
          The UNZA Alumni Network exists to foster lasting connections between
          graduates and their alma mater, creating a vibrant community that
          supports both personal and institutional growth. We strive to maintain
          meaningful collaborations that benefit current students, alumni, and
          the university as a whole.
        </p>
      </section>

      {/* Objectives Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((objective, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {objective.title}
                    </h3>
                    <p className="text-gray-600">{objective.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              The UNZA Alumni Network aims to become the cornerstone of
              professional networking and institutional advancement for the
              University of Zambia community. We envision a dynamic platform
              where graduates can connect, collaborate, and contribute to both
              their personal growth and the university&apos;s development.
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <Users className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Building Connections
                  </h3>
                  <p className="text-gray-600">
                    Creating meaningful networks between alumni, current
                    students, and faculty
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <GraduationCap className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Academic Excellence</h3>
                  <p className="text-gray-600">
                    Supporting educational initiatives and scholarship programs
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <HandHeart className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Community Impact</h3>
                  <p className="text-gray-600">
                    Fostering initiatives that benefit both UNZA and the broader
                    community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
            alt="University Campus"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}
