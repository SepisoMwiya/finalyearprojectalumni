import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const contents = await db.content.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(contents);
  } catch (error) {
    console.error("Error fetching contents:", error);
    return NextResponse.json(
      { error: "Failed to fetch contents" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId || !isUserAdmin(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const content = await db.content.create({
      data: {
        ...data,
        date: new Date(data.date),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json(
      { error: "Error creating content" },
      { status: 500 }
    );
  }
} 