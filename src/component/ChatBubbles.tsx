import React from "react";

interface ChatBubblesProps {
  messages: Array<Message>;
}

export const ChatBubbles: React.SFC<ChatBubblesProps> = ({ messages }) => {
  const messageRender = messages.map((message, index) => (
    <p key={index} className={message.sender}>
      {message.message}
    </p>
  ));
  return <div className="chats">{messageRender}</div>;
};
