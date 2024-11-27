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

    const currentAlumni = await db.alumni.findFirst({
      where: { email: userEmail },
    });

    if (!currentAlumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    const chats = await db.chat.findMany({
      where: {
        members: {
          some: {
            id: currentAlumni.id,
          },
        },
      },
      include: {
        members: {
          where: {
            id: {
              not: currentAlumni.id,
            },
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            read: true,
            senderId: true,
          },
        },
      },
    });

    const formattedChats = chats.map((chat) => ({
      ...chat,
      lastMessage: chat.messages[0] || null,
      messages: undefined,
    }));

    return NextResponse.json(formattedChats);
  } catch (error) {
    console.error("[CHATS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 