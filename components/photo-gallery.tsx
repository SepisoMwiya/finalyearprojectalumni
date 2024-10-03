import React from "react";
import Image from "next/image";
import Link from "next/link";

const photos = [
  "https://i.pinimg.com/474x/fb/48/6d/fb486d10f06a76da818a7a92c47d4604.jpg",
  "https://i.pinimg.com/474x/fb/48/6d/fb486d10f06a76da818a7a92c47d4604.jpg",
  "https://i.pinimg.com/474x/fb/48/6d/fb486d10f06a76da818a7a92c47d4604.jpg",
  "https://i.pinimg.com/474x/fb/48/6d/fb486d10f06a76da818a7a92c47d4604.jpg",
];

const PhotoGallery: React.FC = () => {
  return (
    <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo, index) => (
          <Image
            key={index}
            src={photo}
            alt={`Gallery photo ${index + 1}`}
            width={150}
            height={100}
            className="object-cover rounded-lg"
          />
        ))}
      </div>
      <Link
        href="#"
        className="text-green-700 font-semibold text-sm mt-4 inline-block"
      >
        Explore Gallery →
      </Link>
    </div>
  );
};

export default PhotoGallery;
