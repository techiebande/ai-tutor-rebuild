import React, { useContext } from "react";
import Image from "next/image";
import { Message } from "./ChatInterface";
import { AgentContext } from "@/contexts/agent";
import Reply from "./Reply";

const BotMessage = ({
  message,
  playingMessage,
  setPlayingMessage,
  isPlaying,
  isWaiting,
}: {
  message: Message;
  playingMessage: Message | undefined;
  setPlayingMessage: React.Dispatch<React.SetStateAction<Message | undefined>>;
  isPlaying: boolean;
  isWaiting: boolean;
}) => {
  const context = useContext(AgentContext);

  if (!context) {
    throw new Error("ChatSidebar must be used within a ChatProvider");
  }

  const { agent } = context;

  return (
    <div className="flex items-end gap-2">
      <div className="bottom-0 min-w-[30px] left-0 flex items-center justify-center w-[20px] h-[30px] rounded-full overflow-hidden bg-wisdom-blue-2 p-[1px]">
        {agent && (
          <Image
            src={agent.image}
            alt="chatbot image"
            width={20}
            height={20}
            className="max-w-full"
          />
        )}
      </div>
      <Reply
        message={message}
        isUser={false}
        playingMessage={playingMessage}
        setPlayingMessage={setPlayingMessage}
        isPlaying={isPlaying}
        isWaiting={isWaiting}
      />
    </div>
  );
};

export default BotMessage;
