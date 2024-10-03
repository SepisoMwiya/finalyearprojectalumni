"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bottom-0 container rounded-lg shadow-lg items-center">
      <footer className="rounded-md bg-green-700 text-white py-8 flex flex-col items-center justify-between container bg-secondary ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-col items-start gap-10 justify-between h-full">
            {/* Logo */}
            <div className="">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpHt9dqCE8OX_JJfJ1azJfjCcaXxrlj3XxPQ&s" // Same logo as the navbar
                alt="UNZA Logo"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-10 justify-between">
              <div className="">
                <Input
                  type="text"
                  placeholder="Search.."
                  className="p-2 rounded-sm text-black w-full"
                />
              </div>
              <div className="hidden md:flex items-center gap-4 text-white">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <p className="text-sm">0972539594</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <p className="text-sm">info@unza.c.zm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 gap-8 items-center justify-between">
            <ul className="flex flex-col items-start gap-4">
              <li>
                <Link href="/" className="hover:font-bold">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/programs-and-events" className="hover:font-bold">
                  Programs & Events
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:font-bold">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/career-opportunities" className="hover:font-bold">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="hover:font-bold">
                  Alumni
                </Link>
              </li>
            </ul>
            <div className="flex flex-col items-start gap-4">
              <Button className="bg-white text-black font-bold rounded hover:bg-orange-400">
                Login
              </Button>
              <Button className="bg-white text-black font-bold rounded hover:bg-orange-400">
                Register
              </Button>
              <Button className="bg-red-600 text-white font-bold rounded hover:bg-primary">
                Make A Donation
              </Button>
            </div>
          </div>
        </div>
      </footer>
      <div className="text-center text-sm text-gray-700 bg-white flex flex-col items-center justify-between container py-2">
        ©2024 The University of Zambia, Sepiso Mwiya and Pumulo Mufalali
      </div>
    </div>
  );
};

export default Footer;
