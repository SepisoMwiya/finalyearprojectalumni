import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    // Get current alumni
    const currentAlumni = await db.alumni.findFirst({
      where: { email: userEmail },
      select: {
        id: true,
        school: true,
        graduationYear: true,
        sentConnections: {
          select: { toAlumniId: true }
        },
        receivedConnections: {
          select: { fromAlumniId: true }
        }
      }
    });

    if (!currentAlumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    // Get existing connection IDs
    const existingConnectionIds = [
      ...currentAlumni.sentConnections.map(c => c.toAlumniId),
      ...currentAlumni.receivedConnections.map(c => c.fromAlumniId)
    ];

    // Find suggested alumni based on:
    // 1. Same school
    // 2. Similar graduation year (±2 years)
    // 3. Not already connected
    // 4. Not the current user
    const suggestedAlumni = await db.alumni.findMany({
      where: {
        AND: [
          {
            OR: [
              { school: currentAlumni.school },
              {
                graduationYear: {
                  gte: currentAlumni.graduationYear - 2,
                  lte: currentAlumni.graduationYear + 2
                }
              }
            ]
          },
          { id: { not: currentAlumni.id } },
          { id: { notIn: existingConnectionIds } }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        jobTitle: true,
        currentCompany: true,
        school: true,
        graduationYear: true,
        _count: {
          select: {
            sentConnections: true,
            receivedConnections: true
          }
        }
      },
      take: 6,
    });

    // Transform the data and add reason for suggestion
    const suggestions = suggestedAlumni.map(alumni => ({
      id: alumni.id,
      name: `${alumni.firstName} ${alumni.lastName}`,
      imageUrl: alumni.profileImage || "/default-avatar.png",
      role: alumni.jobTitle || "",
      company: alumni.currentCompany || "",
      school: alumni.school,
      commonConnections: alumni._count.sentConnections + alumni._count.receivedConnections,
      reasonForSuggestion: alumni.school === currentAlumni.school 
        ? "From your school"
        : "Similar graduation year"
    }));

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("[SUGGESTED_ALUMNI_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 