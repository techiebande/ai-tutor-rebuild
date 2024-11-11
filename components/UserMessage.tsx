import React from "react";
import Reply from "./Reply";
import { Message } from "./ChatInterface";

const UserMessage = ({
  message,
  playingMessage,
  setPlayingMessage,
  isPlaying,
  isWaiting,
}: {
  message: Message;
  playingMessage: Message | undefined;
  setPlayingMessage: React.Dispatch<React.SetStateAction<Message | undefined>>;
  isPlaying: boolean;
  isWaiting: boolean;
}) => {
  return (
    <div className="flex items-end gap-4">
      <Reply
        message={message}
        isUser={true}
        playingMessage={playingMessage}
        setPlayingMessage={setPlayingMessage}
        isPlaying={isPlaying}
        isWaiting={isWaiting}
      />
    </div>
  );
};

export default UserMessage;
