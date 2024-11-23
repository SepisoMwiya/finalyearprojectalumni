import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const alumni = await db.alumni.findUnique({
      where: {
        id: parseInt(params.id),
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (!alumni) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const skill = await db.skill.create({
      data: {
        name: body.name,
        alumniId: parseInt(params.id),
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error("[SKILLS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
