import { useState } from 'react';

import InputComponent from './InputComponent';
const NewChat = () => {
    const [prompt, setPrompt] = useState<string>("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      };
  return (
    <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-2xl font-bold">
      Ask Me Anything about Budget for FY 2025-2026
    </h1>
    <InputComponent handleSubmit={handleSubmit} setPrompt={setPrompt} prompt={prompt} />
  </div>
  )
}

export default NewChat