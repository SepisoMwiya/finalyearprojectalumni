import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { requestId: string; action: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress;
    const { requestId, action } = params;

    if (!["accept", "decline"].includes(action)) {
      return new NextResponse("Invalid action", { status: 400 });
    }

    // Get current mentor using email address
    const mentor = await db.alumni.findFirst({
      where: { email: userEmail },
      include: { mentor: true },
    });

    if (!mentor || !mentor.mentor) {
      return new NextResponse("Mentor not found", { status: 404 });
    }

    // Update mentorship request and create notification in a transaction
    const result = await db.$transaction(async (tx) => {
      console.log(
        `Attempting to update mentorship request with ID: ${requestId}`
      );
      // Update mentorship request status
      const request = await tx.mentorshipRequest.update({
        where: { id: parseInt(requestId) },
        data: {
          status: action === "accept" ? "accepted" : "rejected",
        },
        include: {
          mentee: true,
        },
      });

      // Create notification for mentee
      await tx.notification.create({
        data: {
          type:
            action === "accept" ? "MENTORSHIP_ACCEPTED" : "MENTORSHIP_DECLINED",
          message:
            action === "accept"
              ? "accepted your mentorship request"
              : "declined your mentorship request",
          fromAlumniId: mentor.id,
          toAlumniId: request.menteeId,
          read: false,
        },
      });

      // If accepted, create initial chat between mentor and mentee
      if (action === "accept") {
        const chat = await tx.chat.create({
          data: {
            members: {
              connect: [{ id: mentor.id }, { id: request.menteeId }],
            },
          },
        });

        // Add welcome message
        await tx.message.create({
          data: {
            chatId: chat.id,
            senderId: mentor.id,
            content:
              "Hi! I've accepted your mentorship request. Feel free to ask any questions!",
          },
        });
      }

      return request;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[MENTORSHIP_ACTION]", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal error",
      { status: 500 }
    );
  }
}
