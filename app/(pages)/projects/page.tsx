import React from "react";
import ProjectBanner from "@/components/project-banner";
import { db } from "@/lib/prisma";
import ProjectsList from "@/components/ProjectsList";


async function ProjectsPage() {
  const projects = await db.project.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  const categories = await db.projectCategory.findMany();

  return (
    <>
      <div className="container mt-8">
        <h1 className="text-3xl font-bold mb-6">Our Projects</h1>
        <ProjectsList initialProjects={projects} categories={categories} />
      </div>
    </>
  );
}

export default ProjectsPage;
