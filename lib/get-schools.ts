import { db } from "./prisma";

export async function getSchools() {
  try {
    const schools = await db.school.findMany({
      select: {
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return schools.map((school: { name: string }) => school.name);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return [];
  }
}
