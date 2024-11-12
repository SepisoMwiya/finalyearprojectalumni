import Banner from "@/components/banner";
import FeaturedProjectsSection from "@/components/featured-projects-section";
import MissionSection from "@/components/about-the-mission";
import { db } from "@/lib/prisma";

export default async function Home() {
  const featuredProjects = await db.project.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  return (
    <>
      <Banner />
      <FeaturedProjectsSection initialProjects={featuredProjects} />
      <MissionSection />
    </>
  );
}

// checking if the github setup is configured
