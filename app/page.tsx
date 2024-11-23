import Banner from "@/components/banner";
import FeaturedProjectsSection from "@/components/featured-projects-section";
import MissionSection from "@/components/about-the-mission";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  let isAlumni = false;

  if (user?.emailAddresses[0]?.emailAddress) {
    const alumni = await db.alumni.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });
    isAlumni = !!alumni;
  }

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
      <Banner isAlumni={isAlumni} />
      <FeaturedProjectsSection initialProjects={featuredProjects} />
      <MissionSection />
    </>
  );
}

// checking if the github setup is configured
