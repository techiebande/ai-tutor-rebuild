import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

export function TooltipItem({
  icon,
  content,
  className,
  onClick,
}: {
  icon: StaticImageData;
  content: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            className="min-w-[30px] bg-transparent p-0 hover:bg-transparent"
          >
            <Image src={icon} alt="" width={30} height={30} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className={cn(className)}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
