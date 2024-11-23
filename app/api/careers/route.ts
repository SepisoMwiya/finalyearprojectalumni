import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { isUserAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId || !isUserAdmin(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { skills, ...careerData } = data;

    const career = await db.career.create({
      data: {
        ...careerData,
        skills: {
          create: skills.map((skill: string) => ({
            skill: skill,
          })),
        },
      },
      include: {
        skills: true,
      },
    });

    return NextResponse.json(career);
  } catch (error) {
    console.error("Error creating career:", error);
    return NextResponse.json(
      { error: "Error creating career" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const careers = await db.career.findMany({
      include: {
        skills: true,
      },
      orderBy: {
        postedDate: "desc",
      },
    });

    return NextResponse.json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Error fetching careers" },
      { status: 500 }
    );
  }
} 