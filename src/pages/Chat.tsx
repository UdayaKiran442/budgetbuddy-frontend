/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuBrainCircuit } from "react-icons/lu";

import { getMessages, sendMessage } from "../api/chat";

import InputComponent from "../components/InputComponent";
import { IMessage } from "../models/message.model";

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    const tempMessage: IMessage = {
      prompt: prompt.trim(),
      response: "",
      chatId: "chat_5749044c-fde8-4ed8-b3b3-c30aff07757d",
      messageId: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setError("");
      setIsLoading(true);
      setChatMessages((prev) => [...prev, tempMessage]);
      
      const response = await sendMessage({
        chatId: "chat_5749044c-fde8-4ed8-b3b3-c30aff07757d",
        prompt: prompt.trim(),
      });

      if (!response.response) {
        throw new Error("Failed to get response from server");
      }

      await refetch();
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMessages() {
    const messages = await getMessages(
      "chat_5749044c-fde8-4ed8-b3b3-c30aff07757d"
    );
    setChatMessages(messages);
    return messages;
  }

  const { isPending, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isPending) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">   
        <div className="flex flex-col space-y-4 p-4">
          {chatMessages.map((message) => (
            <div key={message.messageId}>
              <div className="flex flex-col items-end mb-4">
                <p className="bg-[#303030] rounded-lg px-4 py-2 max-w-[70%] w-fit">
                  {message.prompt}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <LuBrainCircuit className="text-2xl bg-[#303030] p-2 rounded-full flex-shrink-0" />
                <p className="bg-[#303030] rounded-lg px-4 py-2 max-w-[70%]">
                  {message.messageId.startsWith('temp-') && isLoading 
                    ? "Thinking..." 
                    : message.response}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 p-4 justify-center flex">
        <InputComponent
          handleSubmit={handleSubmit}
          setPrompt={setPrompt}
          prompt={prompt}
        />
      </div>
    </div>
  );
};

export default Chat;
