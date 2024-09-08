"use client";
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChange = (value) => {
    setSelectedChat(value);
  };

  console.log(selectedChat);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        handleChange,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
