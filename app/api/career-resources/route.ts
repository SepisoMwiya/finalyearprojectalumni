import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const resource = await db.careerResource.create({
      data
    })
    return NextResponse.json(resource)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 })
  }
} 