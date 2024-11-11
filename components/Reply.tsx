import { Clock2Icon, PlayIcon, SquareIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import { Button } from "./ui/button";
import Copy from "../public/copy.svg";
import { cn } from "@/lib/utils";
import { ChatContext } from "./Chat";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Message } from "./ChatInterface";
import "katex/dist/katex.min.css";
import { AgentContext } from "@/contexts/agent";

const Reply = ({
  message,
  isUser,
  playingMessage,
  setPlayingMessage,
  isPlaying,
  isWaiting,
}: {
  message: any;
  isUser: boolean;
  playingMessage: Message | undefined;
  setPlayingMessage: React.Dispatch<React.SetStateAction<Message | undefined>>;
  isPlaying: boolean;
  isWaiting: boolean;
}) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isPlayingMessage, setIsPlayingMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const context = useContext(AgentContext);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  if (!context) {
    throw new Error("ChatSidebar must be used within a ChatProvider");
  }

  const { agent } = context;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(message?.content)
      .then(() => {
        alert("Message copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handlePlay = async () => {
    setPlayingMessage(message);

    if (!isPlayingMessage) {
      setIsLoading(true);
      try {
        if (agent?.use_cloud_voice) {
          // Fetch audio from API if cloud voice is enabled
          const response = await fetch(
            "https://api.7x95.com/api/v1/read/text",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer your-token-here", // Add token here if required
              },
              body: JSON.stringify({
                message_id: message.id,
                text: message?.content,
                voice: agent?.cloud_voice,
                provider: agent?.cloud_voice_provider,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch audio from the server.");
          }

          const data = await response.json();

          const audioUrl = data.data.audio;
          const audioElement = new Audio(audioUrl);

          audioElement.onended = () => {
            setIsPlayingMessage(false);
            setPlayingMessage(undefined);
          };

          audioElement.play();
          setAudio(audioElement);
          setIsPlayingMessage(true);
        } else {
          // Use browser's Text-to-Speech if cloud voice is disabled
          const utterance = new SpeechSynthesisUtterance(message?.content);

          //@ts-expect-error
          utterance.voice = window.speechSynthesis
            .getVoices()
            .find((v) => v.name === agent?.google_voice || "Google US English");

          utterance.onend = () => {
            setIsPlayingMessage(false);
            setPlayingMessage(undefined);
          };

          window.speechSynthesis.speak(utterance);
          utteranceRef.current = utterance;
          setIsPlayingMessage(true);
        }
      } catch (error) {
        console.error("Error playing the audio: ", error);
        setIsPlayingMessage(false);
      } finally {
        setIsLoading(false); // Set loading to false after the fetch is done
      }
    } else {
      if (audio) {
        audio.pause();
        setAudio(null);
      }
      if (utteranceRef.current) {
        window.speechSynthesis.cancel(); // Stop the browser TTS if it is playing
        utteranceRef.current = null;
      }
      setIsPlayingMessage(false);
      setPlayingMessage(undefined);
    }
  };

  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative bg-gray-600 p-4 rounded-lg text-white min-w-[87%] md:min-w-[70%] border-b-4 border-gray-800 ",
        isUser ? "bg-blue-500 border-blue-300 ml-auto" : "mr-auto"
      )}
    >
      <p className="text-lg font-bold">{isUser ? "You" : agent?.name}</p>
      {isWaiting ? (
        <div className="flex items-center justify-start space-x-2 w-[100px] mt-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-400"></div>
        </div>
      ) : (
        <div>
          {message?.images.length > 0 ? (
            <Image
              className="w-[20%] float-left mr-4 mb-4"
              src={message.images[0]}
              alt=""
              width={50}
              height={50}
            />
          ) : (
            ""
          )}
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              //@ts-expect-error
              code({ node, inline, className, children, ...props }) {
                return inline ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  //@ts-expect-error
                  <pre className={className} {...props}>
                    {children}
                  </pre>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}

      <div className="flex items-center gap-1 mt-4">
        <Clock2Icon className="w-4 h-4" />

        {message.date && <span>{message.date}</span>}
      </div>

      {!isUser ? (
        <div className="w-4 h-4 absolute bottom-4 -left-[6px] rotate-[220deg] bg-inherit"></div>
      ) : null}

      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Button
          disabled={isPlaying}
          className="bg-blue-600 hover:bg-blue-600 p-0 w-6 h-6 rounded-full flex items-center justify-center"
          onClick={handlePlay}
        >
          {isLoading ? (
            <Loader2Icon className="w-[16px] h-[16px] animate-spin" /> // Loading icon
          ) : playingMessage?.id === message?.id && isPlayingMessage ? (
            <SquareIcon className="w-[14px] h-[16px]" />
          ) : (
            <PlayIcon className="w-[16px] h-[16px]" />
          )}
        </Button>
        <Button
          className="bg-transparent hover:bg-transparent p-0"
          onClick={handleCopy}
        >
          <Image src={Copy} width={24} height={24} alt="Copy to clipboard" />
        </Button>
      </div>
    </div>
  );
};

export default Reply;
