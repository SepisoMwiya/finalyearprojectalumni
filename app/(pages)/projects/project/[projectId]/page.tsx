import { db } from "@/lib/prisma";
import { Calendar, MapPin, Tag, Target } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { projectId: string } }) => {
  if (!params.projectId) {
    redirect("/");
  }

  const project = await db.project.findUnique({
    where: {
      id: parseInt(params.projectId), // Convert projectId to an integer
    },
  });

  if (!project) {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-6 lg:px-12">
      {/* Header section with main image */}
      <header className="relative h-[75vh] lg:h-[85vh]">
        <Image
          src={project.imageUrl || "https://via.placeholder.com/1600x900"}
          alt={project.title}
          className="w-full h-full object-cover"
          layout="fill"
        />
        <div className="absolute text-white bottom-0 left-0 bg-opacity-90 bg-green-700 p-6">
          <h1 className="text-5xl font-bold">{project.title}</h1>
          <p className="text-2xl">{project.description}</p>
        </div>
      </header>

      {/* Content section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Project description */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">
              Coming Home Means Togetherness
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {/* Some placeholder content, replace with your project content */}
              When the client secured a section in the well-established
              boundaries of East Beach, a studio from the very south was chosen
              to bring the vision of the new project alive. This project is a
              culmination of years of hard work and dedication from our team. We
              are proud to present this project to the community and hope it
              will be well-received. Thank you for your support.
            </p>
          </section>

          {/* Additional Image grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Image
              src={project.extraImage1 || "https://via.placeholder.com/400"}
              alt="Extra image 1"
              className="w-full h-auto rounded-sm"
              width={400}
              height={400}
            />
            <Image
              src={project.extraImage2 || "https://via.placeholder.com/400"}
              alt="Extra image 2"
              className="w-full h-auto rounded-sm"
              width={400}
              height={400}
            />
          </section>
        </div>

        {/* Sidebar with project details */}
        <aside className="col-span-1">
          <div className="top-20 bg-green-700 text-white p-6 rounded-sm">
            <h2 className="text-2xl mb-4">Project Details</h2>
            <p className="text-lg leading-relaxed mt-4 flex items-center">
              <strong className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Status:
              </strong>{" "}
              {project.status}
            </p>
            <p className="text-lg leading-relaxed mt-4 flex items-center">
              <strong className="flex items-center">
                <Target className="w-4 h-4 mr-2" /> Target Amount:
              </strong>{" "}
              K{project.fundingGoal}
            </p>
            <p className="text-lg leading-relaxed mt-4 flex items-center">
              <strong className="flex items-center">
                <Target className="w-4 h-4 mr-2" /> Current Amount:
              </strong>{" "}
              K{project.currentAmount}
            </p>
            <p className="text-lg leading-relaxed mt-4 flex items-center">
              <strong className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Start Date:
              </strong>{" "}
              {project.startDate.toLocaleDateString()}
            </p>
            <p className="text-lg leading-relaxed mt-4 flex items-center">
              <strong className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> End Date:
              </strong>{" "}
              {project.endDate ? project.endDate.toLocaleDateString() : "N/A"}
            </p>
            <p className="text-lg leading-relaxed mt-4 flex items-center">
              <strong className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Location:
              </strong>{" "}
              {project.location}
            </p>
            <p className="text-lg leading-relaxed mt-4 flex items-center">
              <strong className="flex items-center">
                <Tag className="w-4 h-4 mr-2" /> Category:
              </strong>{" "}
              {project.category}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default page;
