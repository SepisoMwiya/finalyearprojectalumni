const { PrismaClient, ProjectStatus } = require("@prisma/client");
// Initialize PrismaClient
const prisma = new PrismaClient();

async function main() {
  // Use the existing PrismaClient instance
  const sampleProjects = [
    {
      title: "UNZA Library Digitization Project",
      description:
        "A project to digitize the University of Zambia's library collection, making it accessible to students and researchers online. This initiative aims to preserve valuable resources and improve access to information for the academic community.",
      imageUrl:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      startDate: new Date("2023-09-01"),
      endDate: new Date("2024-08-31"),
      status: ProjectStatus.ONGOING,
      fundingGoal: 500000, // Added funding goal
      categories: {
        create: [
          { category: { connect: { name: "Technology" } } },
          { category: { connect: { name: "Education" } } },
        ],
      },
    },
    // New projects
    {
      title: "Lusaka Urban Agriculture Initiative",
      description:
        "A project to promote sustainable urban farming practices in Lusaka, aiming to improve food security and create green spaces within the city.",
      imageUrl:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      startDate: new Date("2023-10-15"),
      endDate: new Date("2024-10-14"),
      status: ProjectStatus.ONGOING,
      categories: {
        create: [
          { category: { connect: { name: "Agriculture" } } },
          { category: { connect: { name: "Environment" } } },
        ],
      },
    },
    {
      title: "Zambian Women in Tech Mentorship Program",
      description:
        "An initiative to support and empower women in the Zambian tech industry through mentorship, skill-building workshops, and networking events.",
      imageUrl:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      startDate: new Date("2023-11-01"),
      endDate: new Date("2024-10-31"),
      status: ProjectStatus.ONGOING,
      categories: {
        create: [
          { category: { connect: { name: "Technology" } } },
          { category: { connect: { name: "Education" } } },
        ],
      },
    },
    {
      title: "Copperbelt Renewable Energy Project",
      description:
        "A large-scale initiative to implement solar and wind energy solutions in Zambia's Copperbelt region, reducing reliance on non-renewable energy sources.",
      imageUrl:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      startDate: new Date("2023-12-01"),
      endDate: new Date("2025-11-30"),
      status: ProjectStatus.ONGOING,
      categories: {
        create: [
          { category: { connect: { name: "Energy" } } },
          { category: { connect: { name: "Environment" } } },
        ],
      },
    },
    {
      title: "Zambian Cultural Heritage Preservation",
      description:
        "A project focused on documenting and preserving Zambia's diverse cultural heritage, including traditional music, dance, and crafts.",
      imageUrl:
        "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2025-01-14"),
      status: ProjectStatus.PLANNED,
      categories: {
        create: [
          { category: { connect: { name: "Culture" } } },
          { category: { connect: { name: "Education" } } },
        ],
      },
    },
    {
      title: "Kafue River Basin Conservation Project",
      description:
        "An environmental conservation initiative aimed at protecting the Kafue River ecosystem, promoting sustainable water use, and preserving biodiversity.",
      imageUrl:
        "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2026-02-28"),
      status: ProjectStatus.PLANNED,
      categories: {
        create: [
          { category: { connect: { name: "Environment" } } },
          { category: { connect: { name: "Conservation" } } },
        ],
      },
    },
    {
      title: "Zambian Youth Entrepreneurship Program",
      description:
        "A comprehensive program to support young Zambian entrepreneurs through training, mentorship, and access to startup funding.",
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2025-04-30"),
      status: ProjectStatus.PLANNED,
      fundingGoal: 750000, // Added funding goal
      categories: {
        create: [
          { category: { connect: { name: "Business" } } },
          { category: { connect: { name: "Education" } } },
        ],
      },
    },
    {
      title: "UNZA Alumni Dinner",
      description:
        "Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala.",
      imageUrl:
        "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg",
      startDate: new Date("2024-12-24"),
      endDate: new Date("2024-12-24"),
      status: ProjectStatus.ONGOING,
      categories: {
        create: [{ category: { connect: { name: "Event" } } }],
      },
    },
  ];

  // Ensure all categories exist
  const categories = [
    "Technology",
    "Education",
    "Agriculture",
    "Environment",
    "Energy",
    "Culture",
    "Conservation",
    "Business",
  ];

  await prisma?.projectCategory.createMany({
    data: categories.map((name) => ({ name })),
    skipDuplicates: true,
  });

  // Create all projects
  for (const project of sampleProjects) {
    const createdProject = await prisma?.project.create({
      data: project,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    console.log("Project created:", createdProject.title);
  }

  console.log("All sample projects have been created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
