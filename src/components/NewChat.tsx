import { useState } from "react";
import { useNavigate } from "react-router";

import InputComponent from "./InputComponent";
import { createChatAPI, sendMessageAPI } from "../api/chat";

const NewChat = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent, suggestedPrompt?: string) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { chatId } = await createChatAPI();
      await sendMessageAPI({
        chatId,
        prompt: suggestedPrompt ? suggestedPrompt.trim() : prompt.trim(),
      });
      setPrompt("");
      setIsLoading(false);
      navigate(`/chat/${chatId}`);
    } catch (error) {
      alert((error as Error).message);
      setIsLoading(false);
      setPrompt("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">
          Ask Me Anything about Budget for FY 2025-2026
        </h1>
        <InputComponent
          handleSubmit={handleSubmit}
          setPrompt={setPrompt}
          prompt={prompt}
          disabled={isLoading}
        />
        <div className="w-full max-w-5xl mt-8">
          <h2 className="text-lg text-gray-300 mb-4 text-center">
            Suggested Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Job title mentioned in the resume",
              "How will the budget address tax reforms and income tax slab changes?",
              "What initiatives are planned to boost infrastructure and agriculture?",
              "How does the budget aim to enhance support for MSMEs?",
              "What measures will be introduced to promote sustainability and green energy initiatives?",
            ].map((question, index) => (
              <button
                type="submit"
                key={index}
                onClick={async (e) => {
                  setPrompt(question);
                  handleSubmit(e, question);
                }}
                disabled={isLoading}
                className={`bg-[#303030] p-4 rounded-lg text-left hover:bg-[#404040] transition-colors duration-200 text-sm cursor-pointer md:text-base ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewChat;
