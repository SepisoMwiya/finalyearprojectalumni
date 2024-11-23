import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const careers = await db.career.findMany({
      where: {
        status: "active"
      },
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
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
  }
} 