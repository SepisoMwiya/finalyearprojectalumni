import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface NewsItem {
  date: string;
  title: string;
  content: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    date: "24 Dec 2024",
    title: "UNZA Alumni Dinner",
    content:
      "Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with",
    image: "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg",
  },
  {
    date: "24 Dec 2024",
    title: "This Is A News Item Which Is Very Interesting",
    content:
      "Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with. Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala.",
    image: "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg",
  },
  {
    date: "24 Dec 2024",
    title: "This Is Another News Item",
    content:
      "Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with. Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with Join us for an elegant evening of dining and connection at the UNZA Alumni Dinner Gala. Reconnect with",
    image: "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg",
  },
];

const LatestNews: React.FC = () => {
  return (
    <div className="w-2/3 pr-4">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="flex bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={200}
              height={150}
              className="object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-secondary font-bold text-white text-xs px-2 py-1 rounded-md mb-2">
                  {item.date}
                </span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">
                  {item.content.substring(0, 150)}...
                </p>
              </div>
              <Link
                href="#"
                className="text-green-700 font-semibold text-sm mt-2"
              >
                [More]
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center flex items-center justify-center gap-2 underline">
        <Link href="#" className=" text-green-700 text-underline w-full py-2">
          See All Events
        </Link>
        <Button className="bg-orange-400 text-white rounded-full p-2 hover:bg-gray-100 hover:text-orange-400">
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default LatestNews;
