import { IoMdSend } from 'react-icons/io'

const InputComponent = ({handleSubmit}: {handleSubmit: (e: React.FormEvent) => void}) => {
  return (
     <div className="w-[45%] mt-6">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Ask me anything related to recent budget"
          className="border-2 border-white rounded-full w-full p-2.5 pr-12"
        />
        <button type="submit" className="bg-white text-black rounded-full p-2 flex items-center justify-center -ml-11">
          <IoMdSend />
        </button>
      </form>
    </div>
  )
}

export default InputComponent