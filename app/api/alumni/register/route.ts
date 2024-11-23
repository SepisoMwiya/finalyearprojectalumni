import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const alumni = await db.alumni.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        graduationYear: body.graduationYear,
        course: body.course,
        school: body.school,
        currentCompany: body.currentCompany || null,
        jobTitle: body.jobTitle || null,
        country: body.country,
        city: body.city || null,
        bio: body.bio || null,
        linkedInUrl: body.linkedInUrl || null,
      },
    });

    return NextResponse.json(alumni);
  } catch (error) {
    console.error("Error creating alumni:", error);
    return NextResponse.json(
      { error: "Error creating alumni" },
      { status: 500 }
    );
  }
}
