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
    const { chatId } = await req.json();

    const currentAlumni = await db.alumni.findFirst({
      where: { email: userEmail },
    });

    if (!currentAlumni) {
      return new NextResponse("Alumni not found", { status: 404 });
    }

    // If chatId is provided, mark specific chat's messages as read
    // Otherwise, mark all messages as read
    if (chatId) {
      await db.message.updateMany({
        where: {
          chatId: parseInt(chatId),
          senderId: {
            not: currentAlumni.id
          },
          read: false
        },
        data: {
          read: true
        }
      });
    } else {
      await db.message.updateMany({
        where: {
          chat: {
            members: {
              some: {
                id: currentAlumni.id
              }
            }
          },
          senderId: {
            not: currentAlumni.id
          },
          read: false
        },
        data: {
          read: true
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[MESSAGES_MARK_READ]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 