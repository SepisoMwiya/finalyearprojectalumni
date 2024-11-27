import React from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/prisma";

async function getLatestImages() {
  return db.galleryImage.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
}

const PhotoGallery = async () => {
  const photos = await getLatestImages();

  return (
    <div className="w-[400px] bg-gray-100 p-4 rounded-lg flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>

      <div className="flex-grow">
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo) => (
            <div key={photo.id} className="aspect-square relative">
              <Image
                src={photo.url}
                alt={photo.caption || "Gallery photo"}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/gallery"
        className="text-green-700 font-semibold text-sm mt-4 inline-block hover:text-green-800 transition-colors"
      >
        Explore Gallery →
      </Link>
    </div>
  );
};

export default PhotoGallery;
