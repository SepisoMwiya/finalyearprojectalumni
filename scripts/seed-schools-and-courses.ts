const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const schoolsWithCourses = [
    {
      name: "School of Medicine",
      courses: [
        "Bachelor of Medicine and Bachelor of Surgery",
        "Bachelor of Pharmacy",
        "Bachelor of Nursing",
      ],
    },
    {
      name: "School of Engineering",
      courses: [
        "Bachelor of Science in Civil Engineering",
        "Bachelor of Science in Electrical Engineering",
        "Bachelor of Science in Mechanical Engineering",
      ],
    },
    {
      name: "School of Business",
      courses: [
        "Bachelor of Commerce",
        "Bachelor of Business Administration",
        "Bachelor of Accounting",
      ],
    },
    {
      name: "School of Law",
      courses: ["Bachelor of Laws", "Master of Laws"],
    },
    {
      name: "School of Education",
      courses: ["Bachelor of Education", "Master of Education"],
    },
  ];

  for (const school of schoolsWithCourses) {
    const createdSchool = await prisma.school.create({
      data: {
        name: school.name,
        courses: {
          create: school.courses.map((course) => ({
            name: course,
          })),
        },
      },
    });
    console.log(`Created school: ${createdSchool.name}`);
  }

  console.log("All schools and courses have been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
