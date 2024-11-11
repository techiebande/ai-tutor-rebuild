import { cn } from "@/lib/utils";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <main className={cn(className, " px-2 sm:px-5 xl:px-20")}>{children}</main>
  );
};

export default PageContainer;
