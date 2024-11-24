import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { recipientId } = await req.json();
    
    const currentAlumni = await db.alumni.findFirst({
      where: { email: user.emailAddresses[0].emailAddress },
    });

    if (!currentAlumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    // Check if chat already exists
    const existingChat = await db.chat.findFirst({
      where: {
        AND: [
          { members: { some: { id: currentAlumni.id } } },
          { members: { some: { id: parseInt(recipientId) } } },
        ],
      },
    });

    if (existingChat) {
      return NextResponse.json(existingChat);
    }

    // Create new chat
    const chat = await db.chat.create({
      data: {
        members: {
          connect: [
            { id: currentAlumni.id },
            { id: parseInt(recipientId) },
          ],
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.error("[CHATS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 