"use server";

export const getMessageAudio = async (
  messageId: string,
  provider: string,
  voice: string,
  text: string
) => {
  let audio;
  if (messageId && provider && voice && text) {
    try {
      let response = await fetch("https://api.7x95.com/api/v1/read/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer your-token-here",
        },
        body: JSON.stringify({
          message_id: messageId,
          text,
          voice,
          provider,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      audio = await response.json();

      return audio.data.audio;
    } catch (e: any) {
      console.log("Error happened while getting the auido", e?.message);
    }
  } else {
    console.log("Please enter all the required parameters");
  }
};
