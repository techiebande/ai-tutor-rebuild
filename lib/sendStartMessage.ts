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
  setIsTyping: any,
  messages: any
) => {
  try {
    if (agent) {
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
          const lastMessage = updatedMessages[updatedMessages.length - 1];

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
    // setIsWaiting(false);
    setChatImage(null);
  }
};
