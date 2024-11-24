import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma"; // You'll need to create this file to initialize Prisma client
import { isUserAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId || !isUserAdmin(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const project = await db.project.create({
      data: {
        ...data,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Error creating project" },
      { status: 500 }
    );
  }
}

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

export async function PUT(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const data = await request.json();
    const project = await db.project.update({
      where: { id: parseInt(params.projectId) },
      data,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Error updating project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    await db.project.delete({
      where: { id: parseInt(params.projectId) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Error deleting project" },
      { status: 500 }
    );
  }
}
