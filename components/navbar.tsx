"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { UserButton, useUser } from "@clerk/nextjs";
import { Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoadingOverlay from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const isActive = (path: string) => pathname === path;
  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/sign-in";
    }, 1000);
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <nav className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-white">
        <div className="flex justify-between items-center bg-primary container py-2">
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
          <div className="flex items-center gap-2 ml-auto w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search"
              className="h-8 rounded-sm flex-grow md:w-auto"
            />
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                showName
                appearance={{ elements: { userButtonBox: "text-white" } }}
              />
            ) : (
              <Button
                className="h-8 bg-secondary font-bold rounded-sm hover:bg-white hover:text-primary"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : <Link href="/sign-in">Login</Link>}
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between container py-2">
          <div>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpHt9dqCE8OX_JJfJ1azJfjCcaXxrlj3XxPQ&s"
              alt="UNZA Logo"
              width={50}
              height={50}
            />
          </div>
          <Button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
          <NavigationMenu
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:block absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent`}
          >
            <NavigationMenuList className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 p-4 md:p-0">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={`hover:text-secondary ${
                    isActive("/") ? "text-secondary font-bold" : ""
                  }`}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/programs-and-events"
                  className={`hover:text-secondary ${
                    isActive("/programs-and-events")
                      ? "text-secondary font-bold"
                      : ""
                  }`}
                >
                  Programs &amp; Events
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/projects"
                  className={`hover:text-secondary ${
                    isActive("/projects") ? "text-secondary font-bold" : ""
                  }`}
                >
                  Projects
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/career-opportunities"
                  className={`hover:text-secondary ${
                    isActive("/career-opportunities")
                      ? "text-secondary font-bold"
                      : ""
                  }`}
                >
                  Career Opportunities
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/alumni"
                  className={`hover:text-secondary ${
                    isActive("/alumni") ? "text-secondary font-bold" : ""
                  }`}
                >
                  Alumni
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
