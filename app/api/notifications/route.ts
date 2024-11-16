import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const alumni = await db.alumni.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!alumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    const notifications = await db.notification.findMany({
      where: {
        toAlumniId: alumni.id,
        read: false,
      },
      include: {
        fromAlumni: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("[NOTIFICATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
