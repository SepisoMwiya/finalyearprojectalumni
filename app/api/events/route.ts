import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await db.project.findMany({
    where: {
      categories: {
        some: {
          category: {
            name: "Event",
          },
        },
      },
    },
  });

  return NextResponse.json(events);
}
