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
import { getTones } from "@/actions/getTones";

export function ToneSelect({ tone, setTone }: any) {
  const [tones, setTones] = useState([]);
  useEffect(() => {
    const fetchTones = async () => {
      const tones = await getTones();
      setTones(tones);
    };

    fetchTones();
  }, []);

  return (
    <Select
      onValueChange={(value) => {
        setTone(value);
      }}
    >
      <SelectTrigger className="h-[60px] relative pt-2 bg-transparent dark:border-gray-400">
        <p className="w-full text-left absolute left-3 top-2 font-bold">Tone</p>
        <div className="mt-5">
          <SelectValue placeholder="Analytical" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tone</SelectLabel>
          {tones &&
            tones.length > 0 &&
            tones.map((tone: any, i: number) => (
              <SelectItem
                onClick={() => setTone(tone.slug)}
                key={tone.id}
                value={tone.slug}
              >
                {tone.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
