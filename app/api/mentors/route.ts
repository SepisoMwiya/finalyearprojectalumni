import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { expertise, bio, availability } = body;

    // Get the alumni record for the current user
    const alumni = await db.alumni.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!alumni) {
      return new NextResponse("Alumni record not found", { status: 404 });
    }

    // Create the mentor record with expertise relation
    const mentor = await db.mentor.create({
      data: {
        bio,
        availability,
        alumniId: alumni.id,
        expertise: {
          create: expertise.map((exp: string) => ({
            name: exp,
          })),
        },
      },
      include: {
        expertise: true,
      },
    });

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Error creating mentor:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const mentors = await db.mentor.findMany({
      include: {
        expertise: true,
        alumni: true,
      },
    });
    
    return NextResponse.json(mentors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch mentors" },
      { status: 500 }
    );
  }
}
