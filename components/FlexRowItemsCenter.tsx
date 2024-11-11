import { ParentComponentProps } from "@/interfaces/parentComponentProps";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const FlexRowItemsCenter = ({ children, className }: ParentComponentProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
};

export default FlexRowItemsCenter;
