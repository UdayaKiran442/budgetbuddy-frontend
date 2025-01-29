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
    setChatMessages((prev) => [
      ...prev,
      {
        prompt,
        response: "",
        chatId: "chat_5749044c-fde8-4ed8-b3b3-c30aff07757d",
        messageId: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    setIsLoading(true);
    const response = await sendMessage({
      chatId: "chat_5749044c-fde8-4ed8-b3b3-c30aff07757d",
      prompt,
    });
    if (response.response) {
      await refetch();
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError("Something went wrong");
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

  if (isPending) return <div>Loading...</div>;
  return (
    <div className="flex flex-col h-screen">
      {chatMessages.map((message) => (
        <div
          key={message.messageId}
          className="flex-1 flex flex-col space-y-4 overflow-y-auto pb-4"
        >
          <div className="flex flex-col items-end pr-6">
            <p className="bg-[#303030] rounded-full p-2.5 max-w-[30%] w-fit">
              {message.prompt}
            </p>
          </div>
          <div className="flex flex-row justify-start pl-6 gap-5">
            <LuBrainCircuit className="text-4xl bg-[#303030] max-w-[30%] p-2 rounded-full" />
            <p className="max-w-[50%] w-fit">{isLoading ? "Loading..." : message.response}</p>
          </div>
        </div>
      ))}
      <div className="sticky flex pb-20 justify-center">
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
