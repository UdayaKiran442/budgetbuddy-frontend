import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuBrainCircuit } from "react-icons/lu";
import { useParams } from "react-router";

import { getMessagesAPI, sendMessageAPI } from "../api/chat";

import InputComponent from "../components/InputComponent";

import { IMessage } from "../models/message.model";

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { chatId } = useParams() as { chatId: string };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      const tempMessage: IMessage = {
        prompt: prompt.trim(),
        response: "",
        chatId,
        messageId: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setIsLoading(true);
      setChatMessages((prev) => [...prev, tempMessage]);
      setPrompt("");

      await sendMessageAPI({
        chatId,
        prompt: prompt.trim(),
      });
      setIsLoading(false);

      await refetch();
    } catch (err) {
      alert((err as Error).message);
      setPrompt("");
      setIsLoading(false);
    }
  }

  async function fetchMessages() {
    try {
      setIsFetching(true);
      const messages = await getMessagesAPI(chatId);
      setChatMessages(messages);
      setIsFetching(false);
      return messages;
    } catch (error) {
      setIsFetching(false);
      alert((error as Error).message);
    }
  }

  const { refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

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
                <LuBrainCircuit className="text-4xl bg-[#303030] p-2 rounded-full flex-shrink-0" />
                <p className="bg-[#303030] rounded-lg px-4 py-2 max-w-[70%]">
                  {message.messageId.startsWith("temp-") && isLoading
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
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Chat;
