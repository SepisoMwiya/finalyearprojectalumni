import { db } from "@/lib/prisma"
import GalleryTab from "./gallery-tab"

export default async function GalleryTabWrapper() {
  const images = await db.galleryImage.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <GalleryTab images={images} />
} 