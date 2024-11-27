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

    const alumni = await db.alumni.findFirst({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
      },
    });

    if (!alumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    return NextResponse.json(alumni);
  } catch (error) {
    console.error("[CURRENT_ALUMNI_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
