const { PrismaClient, ProjectStatus } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting cleanup of duplicate projects...");

  // Get all projects grouped by title
  const duplicates = await prisma.$queryRaw`
    SELECT title, COUNT(*) as count, GROUP_CONCAT(id) as ids
    FROM Project
    GROUP BY title
    HAVING COUNT(*) > 1
  `;

  for (const dup of duplicates as any[]) {
    // Get all IDs except the first one (keeping the oldest entry)
    const ids = dup.ids.split(",").map(Number);
    const idsToDelete = ids.slice(1);

    // Delete the duplicate entries
    await prisma.projectCategoryRelation.deleteMany({
      where: {
        projectId: {
          in: idsToDelete,
        },
      },
    });

    await prisma.project.deleteMany({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });

    console.log(
      `Deleted ${idsToDelete.length} duplicates of project: ${dup.title}`
    );
  }

  console.log("Cleanup completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
