import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const { fromAlumniId } = await req.json();
    if (!fromAlumniId) {
      return new NextResponse("Missing fromAlumniId", { status: 400 });
    }

    const toAlumni = await db.alumni.findFirst({
      where: { email: userEmail },
    });

    if (!toAlumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    // Update connection and notification in a transaction
    await db.$transaction(async (tx) => {
      // Update connection status
      const connection = await tx.connection.updateMany({
        where: {
          fromAlumniId: parseInt(fromAlumniId),
          toAlumniId: toAlumni.id,
          status: "pending",
        },
        data: {
          status: "connected",
        },
      });

      if (connection.count === 0) {
        throw new Error("Connection not found or already accepted");
      }

      // Mark notification as read
      await tx.notification.updateMany({
        where: {
          fromAlumniId: parseInt(fromAlumniId),
          toAlumniId: toAlumni.id,
          type: "CONNECTION_REQUEST",
          read: false,
        },
        data: {
          read: true,
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONNECTION_ACCEPT]", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal error",
      { status: 500 }
    );
  }
} 