"use server";
import axios from "axios";

export const sendMessage = async (
  conversationId: string,
  text: string,
  images: string[] | null,
  language: string,
  tone: string
) => {
  try {
    const response = await axios.post(
      "https://api.7x95.com/api/v1/message/send",
      images
        ? {
            conversation_id: conversationId,
            text: text,
            images: images,
            language,
            tone,
          }
        : {
            conversation_id: conversationId,
            text: text,
            images: [],
            language,
            tone,
          },
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer your-token-here",
        },
      }
    );

    return response.data;
  } catch (e: any) {
    console.error("Error sending message:", e.message);
  }
};
