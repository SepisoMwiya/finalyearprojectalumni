import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Content } from "@prisma/client";
import { format } from "date-fns";

interface LatestNewsProps {
  news: Content[];
}

export default function LatestNews({ news }: LatestNewsProps) {
  return (
    <div className="flex-1 pr-8">
      <h2 className="text-2xl font-bold mb-6">Latest News</h2>
      <div className="space-y-8">
        {news.map((item) => (
          <div key={item.id} className="border-b pb-6">
            <div className="relative h-48 mb-4">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <time className="text-sm text-gray-500">
              {format(new Date(item.date), "dd MMM yyyy")}
            </time>
            <Link href={`/news/${item.id}`}>
              <h3 className="text-xl font-semibold mt-2 hover:text-green-700">
                {item.title}
              </h3>
            </Link>
            <p className="text-gray-600 mt-2 line-clamp-3">{item.description}</p>
            <Link
              href={`/news/${item.id}`}
              className="text-green-700 hover:text-green-800 mt-4 inline-block"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
