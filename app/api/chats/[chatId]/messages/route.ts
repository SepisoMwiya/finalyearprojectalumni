import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

import { io } from "@/lib/socket";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const messages = await db.message.findMany({
      where: { chatId: parseInt(params.chatId) },
      include: {
        sender: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[MESSAGES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content } = await req.json();

    const currentAlumni = await db.alumni.findFirst({
      where: { email: user.emailAddresses[0].emailAddress },
    });

    if (!currentAlumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    const message = await db.message.create({
      data: {
        content,
        chatId: parseInt(params.chatId),
        senderId: currentAlumni.id,
      },
      include: {
        sender: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Emit message to all users in the chat
    io.to(`chat:${params.chatId}`).emit(`chat:${params.chatId}`, message);

    return NextResponse.json(message);
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
