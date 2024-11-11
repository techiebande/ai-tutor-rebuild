"use client";
import Image from "next/image";
import Logo from "@/public/wisdom-crm-logo.png";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import FlexRowItemsCenter from "./FlexRowItemsCenter";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import { useUser } from "@/hooks/useUser";

const Navbar = () => {
  return (
    <nav className="shadow bg-wisdom-blue-1 z-50 dark:bg-black h-[60px] sticky top-0 flex items-center justify-between">
      <div className="px-3 lg:px-20 w-full">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link
              className="text-xl font-bold text-gray-800 dark:text-white"
              href="/"
            >
              <Image
                src={Logo}
                alt="wisdom CRM logo"
                width={150}
                height={100}
              />
            </Link>
          </div>

          <FlexRowItemsCenter>
            <div className="hidden lg:flex">
              <Navigation />
            </div>

            <ModeToggle />
            <MobileNav />
          </FlexRowItemsCenter>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
