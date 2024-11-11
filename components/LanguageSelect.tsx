import React, { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLanguages } from "@/actions/getLanguages";

export function LanguageSelect({ language, setLanguage }: any) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const languages = await getLanguages();
      setLanguages(languages);
    };

    fetchLanguages();
  }, []);

  return (
    <Select
      onValueChange={(value) => {
        setLanguage(value);
      }}
    >
      <SelectTrigger className="h-[60px] relative pt-2 bg-transparent dark:border-gray-800">
        <p className="w-full text-left absolute left-3 top-2 font-bold">
          Output Language
        </p>
        <div className="mt-5">
          <SelectValue placeholder="English (US)" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Output Language</SelectLabel>
          {languages &&
            languages.length > 0 &&
            languages.map((language: any) => (
              <SelectItem key={language.id} value={language.name}>
                {language.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
