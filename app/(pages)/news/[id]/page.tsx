import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewsPage({ params }: { params: { id: string } }) {
  const news = await db.content.findFirst({
    where: {
      id: parseInt(params.id),
      type: "news",
      status: "published",
    },
  });

  if (!news) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/programs-and-events"
        className="flex items-center text-green-700 hover:text-green-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to News
      </Link>
      <article className="max-w-3xl mx-auto">
        <div className="relative h-[400px] mb-8">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <time className="text-gray-500">
          {format(new Date(news.date), "MMMM dd, yyyy")}
        </time>
        <h1 className="text-4xl font-bold mt-4 mb-6">{news.title}</h1>
        <div className="prose max-w-none">
          <p className="text-xl text-gray-600 mb-8">{news.description}</p>
          <div className="whitespace-pre-wrap">{news.content}</div>
        </div>
      </article>
    </div>
  );
} 