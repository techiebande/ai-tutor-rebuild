import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ButtonWithIconProps {
  text: string;
  icon: React.ReactNode;
  className?: string;
  onClick?: any;
}

const ButtonWithIcon = ({
  text,
  icon,
  className,
  onClick,
}: ButtonWithIconProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(className, "flex items-center justify-ceter gap-2")}
    >
      {icon} {text}
    </Button>
  );
};

export default ButtonWithIcon;
