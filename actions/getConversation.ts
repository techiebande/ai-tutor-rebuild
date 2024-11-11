"use server";

export const getConversation = async (conversationId: string) => {
  let conversation;
  if (conversationId) {
    try {
      let response = await fetch(
        `https://api.7x95.com/api/v1/conversation/${conversationId}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      conversation = await response.json();

      return conversation;
    } catch (e: any) {
      console.log("Error happened", e?.message);
    }
  }
};
