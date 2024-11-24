import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/lib/admin";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId || !isUserAdmin(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const content = await db.content.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        ...data,
        date: new Date(data.date),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId || !isUserAdmin(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.content.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json(
      { error: "Error deleting content" },
      { status: 500 }
    );
  }
}
