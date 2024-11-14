"use client";

import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import { LanguageSelect } from "./LanguageSelect";
import { ToneSelect } from "./ToneSelect";
import Send from "@/public/send.svg";
import Photo from "@/public/image.svg";
import { LoaderCircle, Mic, Router, XIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { sendMessage } from "@/actions/sendMessage";
import { uploadImage } from "@/actions/uploadImage";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import VUMeter from "./VUMeter";
import { useParams, useRouter } from "next/navigation";
import { AgentContext } from "@/contexts/agent";
import { startConversation } from "@/actions/startConversation";
import { toast } from "sonner";
import { sendStartMessageToAI } from "@/lib/sendStartMessage";
import { generateLongId } from "@/lib/generateRandomId";
import { sendMessageToAI } from "@/lib/sendMessage";

const ChatFooter = ({
  setMessages,
  messages,
  isWaiting,
  setIsWaiting,
  input,
  setInput,
}: {
  setMessages: any;
  messages: any;
  isWaiting: boolean;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { slug } = useParams();

  const [sendInputMessage, setSendInputMessage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [chatImage, setChatImage] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [conversationId, setConversationId] = useState(() => {
    //@ts-expect-error
    if (slug[2]) {
      //@ts-expect-error
      return slug[2];
    }
    return "";
  });
  const [language, setLanguage] = useState();
  const [tone, setTone] = useState();
  const [isTyping, setIsTyping] = useState(false);

  const router = useRouter();

  const agentContext = useContext(AgentContext);

  if (!agentContext) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }

  const { agent, agentLoading, agentError } = agentContext;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
    e.target.value = "";
  }, []);

  useEffect(() => {
    const handleImageUpload = async () => {
      if (selectedFiles.length > 0) {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("file", file);
        });

        setUploadingImage(true);
        try {
          const images = await uploadImage(formData);
          if (images && images.length > 0) {
            setChatImage(images[0]);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        } finally {
          setUploadingImage(false);
        }
      }
    };

    handleImageUpload();
  }, [selectedFiles]);

  useEffect(() => {
    const startMessaging = async () => {
      if (input.trim() && agent && messages.length == 1 && sendInputMessage) {
        setInput("");

        const newUserMessage = {
          content: input,
          date: format(new Date(), "Pp")
            .replaceAll("/", "-")
            .replaceAll(",", ""),
          sender: "User",
          id: generateLongId(),
          images: chatImage ? [chatImage] : [],
        };

        setMessages((prevMessages: any) => [...prevMessages, newUserMessage]);

        const systemMessage = {
          content: "",
          date: format(new Date(), "Pp")
            .replaceAll("/", "-")
            .replaceAll(",", ""),
          sender: "system",
          images: [],
        };
        setMessages((prevMessages: any) => [...prevMessages, systemMessage]);

        setIsWaiting(true);

        const conversation = await startConversation(
          agent.id,
          input,
          language,
          tone
        );

        if (!conversation?.data?.id) {
          toast("Failed to send message please try again", {
            style: { color: "red" },
            dismissible: true,
          });

          setMessages((prevMessages: any) => prevMessages.slice(0, -2));
          setIsWaiting(false);
          setSendInputMessage(false);

          return;
        }

        if (conversation && conversation?.data?.conversation_id) {
          setConversationId(conversation?.data?.conversation_id);
          try {
            if (agent.slug) {
              const responseText = conversation.data.content;

              let streamedContent = "";

              const batchSize = 7;

              const storeMessagesInLocalStorage = () => {
                setMessages((finalMessages: any) => {
                  localStorage.setItem(
                    "ait_msg",
                    JSON.stringify({
                      agent,
                      messages: finalMessages,
                    })
                  );
                  return finalMessages;
                });
              };

              for (let i = 0; i < responseText.length; i += batchSize) {
                setIsWaiting(false);
                setIsTyping(true);
                streamedContent += responseText.slice(i, i + batchSize);

                // Update the messages state only once per iteration
                setMessages((prevMessages: any) => {
                  const updatedMessages = [...prevMessages];
                  const lastMessage =
                    updatedMessages[updatedMessages.length - 1];

                  // Update content, id, and date of the last message
                  lastMessage.content = streamedContent;
                  lastMessage.id = conversation.data.id;
                  lastMessage.date = conversation.data.date;

                  return updatedMessages;
                });

                await new Promise((resolve) => setTimeout(resolve, 5));
              }

              setIsTyping(false);
              storeMessagesInLocalStorage();
            }
          } catch (error) {
            console.error("Error sending message:", error);
          } finally {
            setIsWaiting(false);
            setChatImage(null);
          }
          setSendInputMessage(false);

          const newUrl = `/chat/${agent.slug}/c/${conversation.data.conversation_id}`;

          window.history.pushState(null, "", newUrl);

          localStorage.setItem(
            "current_conv_id",
            conversation.data.conversation_id
          );
        }
      }
    };

    startMessaging();
  }, [
    // agent,
    sendInputMessage,
    // chatImage,
    // conversationId,
    // input,
    // messages.length,
    // setInput,
    // setIsWaiting,
    // setMessages,
    // language,
    // tone,
    // isTyping,
    // setIsTyping,
    // router,
  ]);

  useEffect(() => {
    if (sendInputMessage && messages.length > 1 && conversationId) {
      const sendRegularMessage = async () => {
        setIsWaiting(true);

        const newUserMessage = {
          content: input,
          date: format(new Date(), "Pp")
            .replaceAll("/", "-")
            .replaceAll(",", ""),
          sender: "User",
          id: generateLongId(),
          images: chatImage ? [chatImage] : [],
        };

        setMessages((prevMessages: any) => [...prevMessages, newUserMessage]);

        setInput("");

        const systemMessage = {
          content: "",
          date: format(new Date(), "Pp")
            .replaceAll("/", "-")
            .replaceAll(",", ""),
          sender: "system",
          images: [],
        };

        setMessages((prevMessages: any) => [...prevMessages, systemMessage]);

        try {
          if (agent?.slug) {
            console.log(
              "DATA TO SEND",
              conversationId,
              input,
              chatImage,
              language,
              tone
            );
            const data = await sendMessage(
              conversationId,
              input,
              chatImage ? [chatImage] : null,
              //@ts-expect-error
              language,
              tone
            );

            if (!data) {
              toast("Failed to send message please try again", {
                style: { color: "red" },
                dismissible: true,
              });

              setMessages((prevMessages: any) => prevMessages.slice(0, -2));
              setIsWaiting(false);
              setSendInputMessage(false);

              return;
            }

            const responseText = data.data.content;

            let streamedContent = "";

            const batchSize = 7;

            const storeMessagesInLocalStorage = () => {
              setMessages((finalMessages: any) => {
                localStorage.setItem(
                  "ait_msg",
                  JSON.stringify({
                    agent,
                    messages: finalMessages,
                  })
                );
                return finalMessages; // Ensure we return the messages to avoid any state issues
              });
            };

            for (let i = 0; i < responseText.length; i += batchSize) {
              setIsWaiting(false);
              setIsTyping(true);
              streamedContent += responseText.slice(i, i + batchSize);

              setMessages((prevMessages: any) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].content =
                  streamedContent;
                updatedMessages[updatedMessages.length - 1].id = data.data.id;
                updatedMessages[updatedMessages.length - 1].date =
                  data.data.date;

                return updatedMessages;
              });

              await new Promise((resolve) => setTimeout(resolve, 5));
            }

            setIsTyping(false);
            storeMessagesInLocalStorage();
          }
        } catch (error) {
          console.error("Error sending message:", error);
        } finally {
          // setIsWaiting(false);
          setChatImage(null);
        }
      };
      // sendMessageToAI(
      //   setIsWaiting,
      //   input,
      //   format,
      //   generateLongId,
      //   chatImage,
      //   setMessages,
      //   setInput,
      //   agent,
      //   sendMessage,
      //   conversationId,
      //   setChatImage,
      //   language,
      //   tone,
      //   isTyping,
      //   setIsTyping,
      //   toast,
      //   messages
      // );
      sendRegularMessage();
      setSendInputMessage(false);
    }
  }, [
    sendInputMessage,
    // conversationId,
    // input,
    // chatImage,
    // setMessages,
    // setIsWaiting,
    // setInput,
    // agent,
    // messages.length,
    // language,
    // tone,
    // isTyping,
    // setIsTyping,
  ]);

  const handleSendMessage = useCallback(() => {
    if (input.trim() !== "") {
      setSendInputMessage(true);
    }
  }, [input]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  // Speech-to-text functionality using Web Speech API
  const startListening = useCallback(() => {
    // @ts-expect-error
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      // @ts-expect-error
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    setIsListening(true);
    recognition.start();
  }, [setInput]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return (
    <footer className="relative row-span-2 rounded-bl-lg rounded-br-lg p-4 bg-gray-100 dark:bg-gray-800 flex flex-col justify-center border-t dark:border-gray-700">
      {isListening && <VUMeter />}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 w-full">
        <LanguageSelect language={language} setLanguage={setLanguage} />
        <ToneSelect tone={tone} setTone={setTone} />
      </div>
      <div className="w-full flex gap-2 mt-2 bg-white dark:bg-gray-700 pr-2">
        <Input
          className="bg-transparent self-start flex items-start p-2 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isTyping
              ? `Wait ${agent?.name} is typing...`
              : "Please type your message here. Press Enter to send"
          }
          disabled={isTyping || isWaiting}
        />
        <div className="flex items-center gap-3 lg:gap-10">
          <div className="relative inline-block">
            {!uploadingImage ? (
              <Image
                onClick={handleImageClick}
                src={chatImage ? chatImage : Photo}
                alt="upload"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            ) : (
              <LoaderCircle className="w-2 h-2 text-blue-700 animate-spin" />
            )}

            {!uploadingImage && chatImage && (
              <div
                onClick={() => setChatImage(null)}
                className="absolute bg-red-500 w-5 h-5 flex items-center justify-center rounded-full -right-3 -top-3 cursor-pointer"
              >
                <XIcon className="text-white" />
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              disabled={isTyping || isWaiting}
            />
          </div>
          <button
            disabled={isTyping || isWaiting}
            onClick={handleSendMessage}
            className={cn(
              "p-0 bg-transparent hover:bg-transparent text-white rounded-lg hover:bg-blue-600 focus:outline-none",
              isTyping || isWaiting ? "bg-grey-500" : ""
            )}
          >
            <Image src={Send} alt="Send" width={36} height={36} />
          </button>
          <button
            disabled={isWaiting || isTyping}
            onClick={toggleListening}
            className={cn(
              "p-0 bg-transparent hover:bg-transparent text-white rounded-lg focus:outline-none",
              isListening || isWaiting
                ? "text-green-500 hover:bg-green-600"
                : "text-black hover:bg-green-600"
            )}
            aria-label="Toggle Speech Recognition"
          >
            <Mic className="w-9 h-9" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ChatFooter;
