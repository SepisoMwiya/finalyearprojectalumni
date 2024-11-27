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
    <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo) => (
          <Image
            key={photo.id}
            src={photo.url}
            alt={photo.caption || "Gallery photo"}
            width={150}
            height={100}
            className="object-cover rounded-lg"
          />
        ))}
      </div>
      <Link
        href="/gallery"
        className="text-green-700 font-semibold text-sm mt-4 inline-block"
      >
        Explore Gallery →
      </Link>
    </div>
  );
};

export default PhotoGallery;
