import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/lib/admin";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId || !isUserAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.galleryImage.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
