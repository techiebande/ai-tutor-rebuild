import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => {
  return (
    <li>
      <Link className={cn("", className)} href={href}>
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
