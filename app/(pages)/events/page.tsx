import React from "react";
import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export default async function EventsPage() {
  const now = new Date();

  // Fetch all published and scheduled events
  const events = await db.content.findMany({
    where: {
      type: "event",
      OR: [
        { status: "published" },
        { status: "featured" },
        { status: "scheduled" },
      ],
      date: {
        gte: now,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative h-48">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4" />
                  <time>{format(new Date(event.date), "MMMM dd, yyyy")}</time>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>
                <Link href={`/events/${event.id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
