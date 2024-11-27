import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const body = await req.json();
    const { mentorId, message } = body;

    if (!mentorId) {
      return new NextResponse("Missing mentorId", { status: 400 });
    }

    // Get current alumni using email address
    const mentee = await db.alumni.findFirst({
      where: { email: userEmail },
    });

    if (!mentee) {
      return new NextResponse("Mentee not found", { status: 404 });
    }

    // Create mentorship request and notification in a transaction
    const result = await db.$transaction(async (tx) => {
      // Check if mentor exists
      const mentor = await tx.mentor.findUnique({
        where: { id: parseInt(mentorId) },
      });

      if (!mentor) {
        throw new Error("Mentor not found");
      }

      // Check if request already exists
      const existing = await tx.mentorshipRequest.findFirst({
        where: {
          mentorId: parseInt(mentorId),
          menteeId: mentee.id,
        },
      });

      if (existing) {
        throw new Error("Mentorship request already exists");
      }

      // Create mentorship request
      const request = await tx.mentorshipRequest.create({
        data: {
          mentorId: parseInt(mentorId),
          menteeId: mentee.id,
          message: message || "",
          status: "pending",
        },
      });

      // Create notification for mentor
      await tx.notification.create({
        data: {
          type: "MENTORSHIP_REQUEST",
          message: "sent you a mentorship request",
          fromAlumniId: mentee.id,
          toAlumniId: mentor.alumniId,
          read: false,
          mentorshipRequestId: request.id,
        },
      });

      return request;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[MENTORSHIP_REQUEST]", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal error",
      { status: 500 }
    );
  }
} 