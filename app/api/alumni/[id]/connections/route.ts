import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const connections = await db.connection.findMany({
      where: {
        OR: [
          { fromAlumniId: parseInt(params.id) },
          { toAlumniId: parseInt(params.id) },
        ],
      },
    });

    return NextResponse.json(connections.length);
  } catch (error) {
    console.error("[CONNECTIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
