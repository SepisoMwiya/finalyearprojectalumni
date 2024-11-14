import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { fromAlumniId } = body;

    const toAlumni = await db.alumni.findFirst({
      where: {
        email: userId,
      },
    });

    if (!toAlumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    // Update connection status
    await db.connection.updateMany({
      where: {
        fromAlumniId: fromAlumniId,
        toAlumniId: toAlumni.id,
        status: "pending",
      },
      data: {
        status: "connected",
      },
    });

    // Mark notification as read
    await db.notification.updateMany({
      where: {
        fromAlumniId: fromAlumniId,
        toAlumniId: toAlumni.id,
        type: "CONNECTION_REQUEST",
        read: false,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONNECTION_ACCEPT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 