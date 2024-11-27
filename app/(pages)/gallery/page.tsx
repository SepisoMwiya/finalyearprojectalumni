import React from "react";
import Image from "next/image";
import { db } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";

async function getGalleryImages() {
  return db.galleryImage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">UNZA Photo Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore moments and memories from the University of Zambia community.
          From campus events to student life, our gallery captures the essence of
          UNZA.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden group">
            <CardContent className="p-0 relative aspect-square">
              <Image
                src={image.url}
                alt={image.caption || "Gallery image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {image.category && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                  {image.category}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No images have been added to the gallery yet.
        </div>
      )}
    </div>
  );
} 