import { useAppSelector } from "@/lib/hooks";
import { MessageType } from "@/types/types";
import Image from "next/image";
import React from "react";

export default function MessageBox({ message }: { message: MessageType }) {
  const user = useAppSelector((state) => state.userReducer.user);
  const isUser = user?.user_id.toString() == message.senderId;
  return (
    <>
    {isUser? <div className="chat chat-end">
      <div className="chat-bubble bg-emerald-500 text-white">
        {message.type=='text'? <span>{message.content}</span>:<Image src={message.content} alt="image" width={200} height={200}/>}
      </div>
    </div>:<div className="chat chat-start">
      <div className="chat-bubble bg-emerald-500 text-white">
        {message.type=='text'? <span>{message.content}</span>:<Image src={message.content} alt="image" width={200} height={200}/>}
      </div>
    </div> }

    </>
   
  );
}
  
