import { IoMdSend } from 'react-icons/io'

const InputComponent = ({handleSubmit, setPrompt, prompt, disabled}: {handleSubmit: (e: React.FormEvent) => void, setPrompt: (prompt: string) => void, prompt: string, disabled: boolean}) => {
  return (
     <div className="w-[45%] mt-6">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          disabled={disabled}
          type="text"
          placeholder="Ask me anything related to recent budget"
          className="border-2 border-white rounded-full w-full p-2.5 pr-12"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button disabled={disabled} type="submit" className="bg-white text-black rounded-full p-2 flex items-center justify-center cursor-pointer -ml-11">
          <IoMdSend />
        </button>
      </form>
    </div>
  )
}

export default InputComponent