import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navigation from "./Navigation";
import { MenuIcon } from "lucide-react";
import FlexRowItemsCenter from "./FlexRowItemsCenter";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon className="cursor-pointer lg:hidden" />
      </SheetTrigger>
      <SheetContent className="py-3 ">
        <SheetHeader>
          <FlexRowItemsCenter>
            <SheetTitle>Menu</SheetTitle>
          </FlexRowItemsCenter>
        </SheetHeader>
        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
