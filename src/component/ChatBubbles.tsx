import React, { useState, useEffect } from "react";

interface ChatBubblesProps {
  messages: Array<Message>;
}

export const ChatBubbles: React.SFC<ChatBubblesProps> = ({ messages }) => {
  const messageRender = messages.map((message, index) => (
    <p key={index} className={message.sender}>
      {message.message}
    </p>
  ));
  let [showDot, setShowDot] = useState(false)

  useEffect(() => {
    if (!showDot){
      setTimeout(() => setShowDot(true), 1200)
    } 
  })

  return(
    <div className="chats">
      {messageRender}
      {/* {messages[messages.length -1].sender === "human" && showDot && <p key="dotdotdot" className="bot">...</p>} */}
    </div>
    )
};
