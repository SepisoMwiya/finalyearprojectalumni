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
    const { notificationId } = await req.json();

    const alumni = await db.alumni.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!alumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    // If notificationId is provided, mark specific notification as read
    // Otherwise, mark all notifications as read
    if (notificationId) {
      await db.notification.update({
        where: {
          id: notificationId,
          toAlumniId: alumni.id,
        },
        data: {
          read: true,
        },
      });
    } else {
      await db.notification.updateMany({
        where: {
          toAlumniId: alumni.id,
          read: false,
        },
        data: {
          read: true,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[NOTIFICATIONS_MARK_READ]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 