"use client";

import { useContext, useState, useEffect } from "react";

import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import { ChatContext } from "./Chat";
import { cn } from "@/lib/utils";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import ScrollToBottom from "react-scroll-to-bottom";
import { LoaderCircle } from "lucide-react";
import { AgentContext } from "@/contexts/agent";
import { format } from "date-fns";
import { generateLongId } from "@/lib/generateRandomId";
import { useParams } from "next/navigation";
import { getConversation } from "@/actions/getConversation";

export interface Message {
  content?: string;
  sender?: string;
  completed_response?: boolean;
  date: any;
  id?: string;
  images: string[];
}

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const sidebarContext = useContext(ChatContext);

  if (!sidebarContext) {
    throw new Error("ChatSidebar must be used within a ChatProvider");
  }

  const { isSidebarOpen } = sidebarContext;

  const agentContext = useContext(AgentContext);

  if (!agentContext) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }

  const { agent, agentError, agentLoading } = agentContext;

  const [messages, setMessages] = useState<Message[]>([]);

  const [playingMessage, setPlayingMessage] = useState<Message | undefined>(
    undefined
  );

  const [isWaiting, setIsWaiting] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    const initializeMessages = async () => {
      if (agent && slug?.length === 1) {
        setMessages([
          {
            content: agent.welcome_message,
            date: format(new Date(), "Pp")
              .replaceAll("/", "-")
              .replaceAll(",", ""),
            sender: "system",
            id: generateLongId(),
            images: [],
          },
        ]);
      } else if (agent && slug?.length === 3) {
        const conversation = await getConversation(slug[2]);
        if (conversation) {
          setMessages(conversation.data.messages);
        }
      }
    };

    initializeMessages();
  }, [agent, slug]);

  return (
    <div
      className={cn(
        `grid grid-rows-7 col-span-12 h-[calc(100vh-95px)] overflow-y-auto max-h-[calc(100vh-95px)] border mb-1 bg-gray-200 dark:bg-black`,
        isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"
      )}
    >
      <ChatHeader setInput={setInput} />

      {messages && messages.length > 0 ? (
        <ScrollToBottom
          className={cn(
            "flex row-span-7 overflow-y-auto py-4 px-1 space-y-4 overflow-scroll w-[100%] bg-[url('/background-new.png')]"
          )}
        >
          {messages?.map((msg, index) => {
            return msg.sender === "system" ? (
              <div key={index} className="mb-2">
                <BotMessage
                  playingMessage={playingMessage}
                  setPlayingMessage={setPlayingMessage}
                  key={index}
                  message={msg}
                  isPlaying={
                    playingMessage?.id !== msg.id &&
                    playingMessage !== undefined
                  }
                  isWaiting={isWaiting && index === messages.length - 1}
                />
              </div>
            ) : (
              <div key={index} className="mb-2">
                <UserMessage
                  playingMessage={playingMessage}
                  setPlayingMessage={setPlayingMessage}
                  message={msg}
                  isPlaying={
                    playingMessage?.id !== msg.id &&
                    playingMessage !== undefined
                  }
                  isWaiting={isWaiting && index === messages.length - 1}
                />
              </div>
            );
          })}
        </ScrollToBottom>
      ) : (
        <div className="row-span-7 mx-auto flex flex-col items-center justify-center">
          <LoaderCircle className="w-10 h-10 text-blue-700 animate-spin" />
          <p>Starting Conversation...</p>
        </div>
      )}

      <ChatFooter
        setMessages={setMessages}
        messages={messages}
        isWaiting={isWaiting}
        setIsWaiting={setIsWaiting}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};

export default ChatInterface;
