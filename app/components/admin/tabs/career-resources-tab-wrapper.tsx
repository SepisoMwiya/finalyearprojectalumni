import { db } from "@/lib/prisma"
import CareerResourcesTab from "./career-resources-tab"

export default async function CareerResourcesTabWrapper() {
  const resources = await db.careerResource.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <CareerResourcesTab resources={resources} />
} 