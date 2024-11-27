import { db } from "@/lib/prisma"
import AlumniTab from "./alumni-tab"

export default async function AlumniTabWrapper() {
  const alumni = await db.alumni.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <AlumniTab alumni={alumni} />
} 