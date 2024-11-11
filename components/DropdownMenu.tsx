"use client";

import * as React from "react";
import Settings from "@/public/settings.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipItem } from "./ToolTip";
import { Button } from "./ui/button";
import ArrowDown from "@/public/down-arrow.svg";
import Image from "next/image";

export function ChatConfigDropdown() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-transparent hover:bg-transparent p-0 flex items-center">
          <TooltipItem icon={Settings} content="Config" />
          <Image src={ArrowDown} alt="" width={20} height={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="txt">New chat</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">
            Download Report (.txt)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pdf">
            Download Report (.pdf)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="docx">
            Download Report (.docx)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
