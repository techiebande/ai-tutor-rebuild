"use server";

export const sendMessage = async (
  conversationId: string,
  text: string,
  images: string[] | null,
  language: string,
  tone: string
) => {
  let data;

  try {
    const response = await fetch("https://api.7x95.com/api/v1/message/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer your-token-here",
      },
      body: images
        ? JSON.stringify({
            conversation_id: conversationId,
            text: text,
            images: images,
            language,
            tone,
          })
        : JSON.stringify({
            conversation_id: conversationId,
            text: text,
            images: [],
            language,
            tone,
          }),
    });

    data = await response.json();

    return data;
  } catch (e: any) {
    return null;
  }
};
