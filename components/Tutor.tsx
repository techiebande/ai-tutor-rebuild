import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { TutorProps } from "@/interfaces/tutorProps";
import { MessageCircle } from "lucide-react";

const Tutor = ({
  className,
  tutor: { name, image, expert, slug },
}: {
  className?: string;
  tutor: TutorProps;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg mx-auto w-full border overflow-hidden",
        className
      )}
    >
      <div className="lg:h-[250] sm:h-[320px] xl:h-[330px] overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt="Hero image"
          className="object-cover w-full mx-auto max-h-full"
          width={100}
          height={100}
        />
      </div>

      <div className="pt-4 bg-white dark:bg-[#2D2D2D] h-full">
        <h1 className="text-[#0180DE] dark:text-gray-100 text-2xl text-center font-bold">
          {name}
        </h1>
        <p className="mt-4 text-center">{expert}</p>
        <div className="flex justify-center">
          <Link href={`chat/[...slug]`} as={`chat/${slug}`}>
            <Button className="bg-[#0282E3] flex items-center my-4 font-bold rounded-md px-4 py-2.5 text-white">
              <MessageCircle className="me-2" />
              Learn Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
