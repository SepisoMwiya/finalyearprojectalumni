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

    // Read the request body once and store it
    const body = await req.json();
    const { toAlumniId } = body;

    if (!toAlumniId) {
      return new NextResponse("Missing toAlumniId", { status: 400 });
    }

    // Get current alumni using email address
    const fromAlumni = await db.alumni.findFirst({
      where: { email: userEmail },
    });

    if (!fromAlumni) {
      console.log("There was an error! The Sender was not found");
      return new NextResponse("Alumni not found", { status: 404 });
    }

    // Create connection and notification in a transaction
    const result = await db.$transaction(async (tx) => {
      // Check for existing connection
      const existing = await tx.connection.findFirst({
        where: {
          OR: [
            {
              fromAlumniId: fromAlumni.id,
              toAlumniId: parseInt(toAlumniId),
            },
            {
              fromAlumniId: parseInt(toAlumniId),
              toAlumniId: fromAlumni.id,
            },
          ],
        },
      });

      if (existing) {
        throw new Error("Connection already exists");
      }

      // Create connection
      const connection = await tx.connection.create({
        data: {
          fromAlumniId: fromAlumni.id,
          toAlumniId: parseInt(toAlumniId),
          status: "pending",
        },
      });

      // Create notification
      await tx.notification.create({
        data: {
          type: "CONNECTION_REQUEST",
          message: "sent you a connection request",
          fromAlumniId: fromAlumni.id,
          toAlumniId: parseInt(toAlumniId),
          read: false,
        },
      });

      return connection;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[CONNECTION_REQUEST]", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal error",
      { status: 500 }
    );
  }
}
