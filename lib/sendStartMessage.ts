export const sendStartMessageToAI = async (
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
  conversation: any,
  isTyping: any,
  setIsTyping: any
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
      const responseText = conversation.data.content;

      let streamedContent = "";

      const batchSize = 7;

      for (let i = 0; i < responseText.length; i += batchSize) {
        setIsWaiting(false);
        setIsTyping(true);
        streamedContent += responseText.slice(i, i + batchSize);

        setMessages((prevMessages: any) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content = streamedContent;
          updatedMessages[updatedMessages.length - 1].id = conversation.data.id;
          updatedMessages[updatedMessages.length - 1].date =
            conversation.data.date;

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
