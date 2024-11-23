import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/lib/admin";

export async function PUT(
  request: Request,
  { params }: { params: { careerId: string } }
) {
  const { userId } = auth();

  if (!userId || !isUserAdmin(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const career = await db.career.update({
      where: { id: parseInt(params.careerId) },
      data,
    });

    return NextResponse.json(career);
  } catch (error) {
    console.error("Error updating career:", error);
    return NextResponse.json(
      { error: "Error updating career" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { careerId: string } }
) {
  const { userId } = auth();

  if (!userId || !isUserAdmin(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // First delete related skills
    await db.careerSkill.deleteMany({
      where: {
        careerId: parseInt(params.careerId),
      },
    });

    // Then delete the career
    await db.career.delete({
      where: { id: parseInt(params.careerId) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting career:", error);
    return NextResponse.json(
      { error: "Error deleting career" },
      { status: 500 }
    );
  }
} 