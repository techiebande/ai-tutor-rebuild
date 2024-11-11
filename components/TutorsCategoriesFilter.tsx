import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tutorCategories } from "@/lib/tutorCategories";

export function TutorsCategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const onChange = (value: string) => {
    setSelectedCategory(value);
  };
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="h-[50px] w-[300px]">
        <SelectValue placeholder="Select An Option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectedCategory || "Select An Option"}</SelectLabel>
          {tutorCategories.map((cat, index) => (
            <SelectItem key={index} value={cat}>
              {cat.replaceAll("-", " ")}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
