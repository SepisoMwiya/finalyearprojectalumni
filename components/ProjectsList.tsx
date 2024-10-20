"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { Project, ProjectCategory } from "@prisma/client";

// Add this type definition
type ProjectWithCategories = Project & {
  categories: { category: ProjectCategory }[];
};

interface ProjectsListProps {
  initialProjects: ProjectWithCategories[];
  categories: ProjectCategory[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ initialProjects, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? initialProjects.filter((project) =>
        project.categories.some((cat) => cat.category.name === selectedCategory)
      )
    : initialProjects;

  return (
    <>
      {/* Categories filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.name ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsList;
