import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await db.content.findFirst({
    where: {
      id: parseInt(params.id),
      type: "event",
      status: "published",
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/programs-and-events"
        className="flex items-center text-green-700 hover:text-green-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Link>
      <article className="max-w-3xl mx-auto">
        <div className="relative h-[400px] mb-8">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <time>
              {format(new Date(event.date), "MMMM dd, yyyy")}
              {event.endDate && (
                <> - {format(new Date(event.endDate), "MMMM dd, yyyy")}</>
              )}
            </time>
          </div>
          {event.location && (
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
        <div className="prose max-w-none">
          <p className="text-xl text-gray-600 mb-8">{event.description}</p>
          <div className="whitespace-pre-wrap">{event.content}</div>
        </div>
      </article>
    </div>
  );
} 