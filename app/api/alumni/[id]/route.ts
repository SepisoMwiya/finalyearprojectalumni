import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z } from "zod";

const updateAlumniSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  graduationYear: z.number().optional(),
  course: z.string().optional(),
  school: z.string().optional(),
  currentCompany: z.string().nullable().optional(),
  jobTitle: z.string().nullable().optional(),
  country: z.string().optional(),
  city: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  linkedInUrl: z.string().nullable().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateAlumniSchema.parse(body);
    const id = parseInt(params.id);

    const alumni = await db.alumni.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(alumni);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    console.error("[ALUMNI_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
