import Image, { StaticImageData } from "next/image";
import React from "react";
import { AIAgentProps } from "./Chat";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AITutor = ({ tutor }: { tutor: AIAgentProps }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        localStorage.setItem(
          "ait_msg",
          JSON.stringify({
            agent: {},
            messages: [],
          })
        );
        router.push(`/chat/${tutor.slug}`);
      }}
      className="cursor-pointer flex flex-col justify-start gap-5 p-1 bg-white rounded-3xl"
    >
      <div className="flex items-center gap-3">
        <Image
          className="rounded-full"
          src={tutor.image}
          alt="ai tutor"
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-2 p-1 dark:text-black">
          <span className="text-black font-bold capitalize">{tutor.name}</span>
          <p>{tutor.expert}</p>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
