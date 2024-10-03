import { NextResponse } from "next/server";
import { db } from "@/lib/prisma"; // You'll need to create this file to initialize Prisma client

export async function GET() {
  try {
    const projects = await db.project.findMany({
      take: 10, // Limit to 10 projects for the featured section
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

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Error fetching projects" },
      { status: 500 }
    );
  }
}
