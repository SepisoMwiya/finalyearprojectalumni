import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const toAlumniId = formData.get("toAlumniId");

    if (!toAlumniId) {
      return new NextResponse("Missing toAlumniId", { status: 400 });
    }

    // Get the current user's alumni ID
    const fromAlumni = await db.alumni.findFirst({
      where: {
        email: userId,
      },
    });

    if (!fromAlumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    // Check if connection already exists
    const existingConnection = await db.connection.findFirst({
      where: {
        OR: [
          {
            fromAlumniId: fromAlumni.id,
            toAlumniId: parseInt(toAlumniId.toString()),
          },
          {
            fromAlumniId: parseInt(toAlumniId.toString()),
            toAlumniId: fromAlumni.id,
          },
        ],
      },
    });

    if (existingConnection) {
      return new NextResponse("Connection already exists", { status: 400 });
    }

    // Create new connection
    const connection = await db.connection.create({
      data: {
        fromAlumniId: fromAlumni.id,
        toAlumniId: parseInt(toAlumniId.toString()),
        status: "pending",
      },
    });

    // Create notification for the recipient
    await db.notification.create({
      data: {
        type: "CONNECTION_REQUEST",
        message: "sent you a connection request",
        toAlumniId: parseInt(toAlumniId.toString()),
        fromAlumniId: fromAlumni.id,
      },
    });

    return NextResponse.json(connection);
  } catch (error) {
    console.error("[CONNECTION_REQUEST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
