import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const achievementSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  date: z.string(),
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const alumni = await db.alumni.findUnique({
      where: { id: parseInt(params.id) },
      select: { email: true },
    });

    if (!alumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    const body = await req.json();
    const validatedData = achievementSchema.parse(body);

    const achievement = await db.achievement.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        alumniId: parseInt(params.id),
      },
    });

    return NextResponse.json(achievement);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
