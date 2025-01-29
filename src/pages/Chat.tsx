import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuBrainCircuit } from "react-icons/lu";

import { getMessages } from "../api/chat";

import InputComponent from "../components/InputComponent";
import { IMessage } from "../models/message.model";


const Chat = () => {
    const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    async function fetchMessages() {
        const messages = await getMessages("chat_5749044c-fde8-4ed8-b3b3-c30aff07757d");
        console.log(messages);
    }

    const { data, isPending } = useQuery({
        queryKey: ["messages"],
        queryFn: fetchMessages,
    });

    if(data){
        setChatMessages(data);
    }

    if (isPending) return <div>Loading...</div>;
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 flex flex-col space-y-4 overflow-y-auto pb-4">
                <div className="flex flex-col items-end pr-6">
                    <p className="bg-[#303030] rounded-full p-2.5 max-w-[30%] w-fit">User prompt</p>
                </div>
                <div className="flex flex-row justify-start pl-6 gap-5">
                    <LuBrainCircuit className="text-4xl bg-[#303030] max-w-[30%] p-2 rounded-full" />
                    <p className="max-w-[50%] w-fit">AI response Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam dolore debitis iusto soluta odit amet neque iste laborum esse dicta, voluptate, fuga accusantium et quam cupiditate nesciunt eligendi unde molestias!</p>
                </div>
            </div>
            <div className="sticky flex pb-20 justify-center">
                <InputComponent handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default Chat;




