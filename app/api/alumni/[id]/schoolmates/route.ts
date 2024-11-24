import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentAlumniSchool = await db.alumni.findUnique({
      where: {
        id: parseInt(params.id),
      },
      select: {
        school: true,
      },
    });
    const schoolmates = await db.alumni.findMany({
      where: {
        school: currentAlumniSchool?.school,
      },
      skip: 1,
    });

    return NextResponse.json(schoolmates.length);
  } catch (error) {
    console.error("[SCHOOLMATES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
