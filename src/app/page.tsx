"use client"

import Chat, { MessageInfo } from "@/components/Chat.component";
import WaitingRoom from "@/components/WaitingRoom.component";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useState } from "react";

export default function Home() {
  const [connect, setConnect] = useState<HubConnection | null>(null);
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState<MessageInfo[]>([]);

  const joinChat = async (userName: string, chatName: string) => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7160/chat")
      .withAutomaticReconnect()
      .build();

    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatName });

      setConnect(connection);
      setChatName(chatName);
    } catch (err) {
      console.error(err)
    }

    connection.on("ReceiveMessage", (userName, message) => {
      setMessages((messages) => [...messages, { userName, message }]);
    });
  };

  const sendMessage = (message: string) => {
    connect?.invoke("SendMessage", message);
  };

  const closeChat = async () => {
    await connect?.stop();
    setConnect(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {connect ? <Chat messages={messages} chatName={chatName} closeChat={closeChat} sendMessage={sendMessage}/> : <WaitingRoom joinChat={joinChat} />}
    </div>
  );
}
