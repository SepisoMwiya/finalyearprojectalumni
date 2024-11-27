import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId || !isUserAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { urls, category } = await req.json();

    const images = await Promise.all(
      urls.map((url: string) =>
        db.galleryImage.create({
          data: {
            url: url.trim(),
            category,
          },
        })
      )
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error creating gallery images:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
