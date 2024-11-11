export const sendMessageToAI = async (
  setIsWaiting: any,
  input: any,
  format: any,
  generateLongId: any,
  chatImage: any,
  setMessages: any,
  setInput: any,
  agent: any,
  sendMessage: any,
  conversationId: any,
  setChatImage: any,
  language: any,
  tone: any,
  isTyping: any,
  setIsTyping: any,
  toast: any
) => {
  setIsWaiting(true);

  const newUserMessage = {
    content: input,
    date: format(new Date(), "Pp").replaceAll("/", "-").replaceAll(",", ""),
    sender: "User",
    id: generateLongId(),
    images: chatImage ? [chatImage] : [],
  };

  setMessages((prevMessages: any) => [...prevMessages, newUserMessage]);

  setInput("");

  const systemMessage = {
    content: "",
    date: format(new Date(), "Pp").replaceAll("/", "-").replaceAll(",", ""),
    sender: "system",
    images: [],
  };

  setMessages((prevMessages: any) => [...prevMessages, systemMessage]);

  try {
    if (agent) {
      const data = await sendMessage(
        conversationId,
        input,
        chatImage ? [chatImage] : null,
        language,
        tone
      );

      if (!data) {
        toast("Failed to send message please try again", {
          style: { color: "red" },
          dismissible: true,
        });

        setMessages((prevMessages: any) => prevMessages.slice(0, -1));

        return;
      }

      const responseText = data.data.content;

      let streamedContent = "";

      const batchSize = 7;

      for (let i = 0; i < responseText.length; i += batchSize) {
        setIsWaiting(false);
        setIsTyping(true);
        streamedContent += responseText.slice(i, i + batchSize);

        setMessages((prevMessages: any) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content = streamedContent;
          updatedMessages[updatedMessages.length - 1].id = data.data.id;
          updatedMessages[updatedMessages.length - 1].date = data.data.date;

          return updatedMessages;
        });

        setMessages((prevMessages: any) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content = streamedContent;

          return updatedMessages;
        });

        await new Promise((resolve) => setTimeout(resolve, 5));
      }
      setIsTyping(false);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    setIsWaiting(false);
    setChatImage(null);
  }
};
