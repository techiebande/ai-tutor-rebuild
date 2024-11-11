"use server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const startConversation = async (
  agentId: string,
  message: string,
  language: any,
  tone: any
) => {
  if (agentId && message) {
    try {
      const response = await fetch(`${BASE_URL}/conversations/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
          message,
          language,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const conversationJson = await response.json();

      return conversationJson;
    } catch (err) {
      console.log("Failed to start conversation.");
    }
  }
};
