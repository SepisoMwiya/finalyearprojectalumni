import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

const experienceSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  current: z.boolean().default(false),
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
    const validatedData = experienceSchema.parse(body);

    const experience = await db.experience.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        alumniId: parseInt(params.id),
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const experiences = await db.experience.findMany({
      where: { alumniId: parseInt(params.id) },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
