import React from "react";

interface ChatBubblesProps {
  messages: Array<Message>;
}

export const ChatBubbles: React.SFC<ChatBubblesProps> = ({ messages }) => {
  const messageRender = messages.map((message, index) => (
    <div key={index} className={message.sender}>
      <p>{message.message}</p>
    </div>
  ));

  return <div className="chats">{messageRender}</div>;
};
