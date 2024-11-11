import React from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AIRoom = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-5 justify-center flex-col">
      <Image src="/no-chat.svg" alt="no chat" width={106} height={197} />
      <p>You haven&apos;t started any conversation yet</p>
      <Button
        onClick={() => router.push("/ai-team/mathematics")}
        className="bg-green-500 text-white flex items-center gap-5"
      >
        <MessageCircle />
        Click Here to chat
      </Button>
    </div>
  );
};

export default AIRoom;
