import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, type, url, category } = body;

    if (!title || !type || !url || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const resource = await db.careerResource.create({
      data: {
        title,
        description: description || "",
        type,
        url,
        category,
      },
    });

    return NextResponse.json(resource);
  } catch (error) {
    console.error("[CAREER_RESOURCES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
