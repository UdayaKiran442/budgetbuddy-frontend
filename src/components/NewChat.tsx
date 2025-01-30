import { useState } from "react";
import { useNavigate } from "react-router";

import InputComponent from "./InputComponent";
import { createChatAPI, sendMessageAPI } from "../api/chat";

const NewChat = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const {chatId} = await createChatAPI();
    await sendMessageAPI({
      chatId,
      prompt: prompt.trim(),
    });
    setPrompt("");
    setIsLoading(false);
    navigate(`/chat/${chatId}`);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">
        Ask Me Anything about Budget for FY 2025-2026
      </h1>
      <InputComponent
        handleSubmit={handleSubmit}
        setPrompt={setPrompt}
        prompt={prompt}
        disabled={isLoading}
      />
    </div>
  );
};

export default NewChat;
