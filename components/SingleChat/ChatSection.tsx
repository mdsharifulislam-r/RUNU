import { setReload } from '@/lib/features/user.reducer'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { MessageType } from '@/types/types'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { CiFaceSmile } from "react-icons/ci";
import { useParams } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { MdAttachFile } from "react-icons/md";
import { uploadImage } from '@/lib/helpers/uploadImage';

export default function ChatSection({socket,id}:{socket:Socket,id:any}) {
    const [text,setText]=useState("")
    const user = useAppSelector(state=>state.userReducer.user)
    const temp:string = id
    const dispatch = useAppDispatch()
    const receId = temp.split("").filter(item=>item!=user?.user_id.toString()).toString()
   
    const imageUpload = async (e:ChangeEvent<HTMLInputElement>)=>{
      const image = await uploadImage(e.target.files)
      const message:MessageType={
        senderId:user?.user_id.toString()||"",
        reciverId:receId,
        content:image,
        type:"image",
        seen:false,
        roomId:id

      }
      socket.emit('message',{room:id,message:message})
      dispatch(setReload())
    }
    const func = (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      if(!text){
        return
      }
      const message:MessageType={
        senderId:user?.user_id.toString()||"",
        reciverId:receId,
        content:text,
        type:"text",
        seen:false,
        roomId:id

      }
      socket.emit('message',{room:id,message:message})
      dispatch(setReload())
      setText("")
      if(showPicker){
        togglePicker()
      }
    }

    const [showPicker, setShowPicker] = useState(false);

    const handleEmojiClick = (emojiObject:EmojiClickData) => {
      setText((prev) => prev + emojiObject.emoji);
    };
  
    const togglePicker = () => {
      setShowPicker((prev) => !prev);
    };
  return (
    <div className='h-[10vh] bg-slate-800 w-full py-4 flex  px-4'>
      <form onSubmit={func}  className='w-full flex place-items-center gap-3'>
        <div className='w-[80%]  bg-slate-700 flex place-items-center rounded-md relative'>
          <input type="file" name="" onChange={imageUpload} hidden id="file" />
          <label htmlFor='file' className='text-emerald-500 md:pl-5 pl-2 cursor-pointer'>
            <MdAttachFile/>
          </label>
        <input value={text} onChange={(e)=>setText(e.target.value)} type="text" className=' py-2 bg-slate-700 w-[90%] focus:outline-none focus:border-gray-600 text-gray-100 rounded-md px-4' name="" id="" placeholder='Send Massage..' />
        <div className='pr-2'>
          <span className='text-white text-xl cursor-pointer' onClick={togglePicker}>
            <CiFaceSmile/>
          </span>
        </div>
        <div className='absolute bottom-16 md:right-0 -right-20' onMouseLeave={togglePicker}>
          <EmojiPicker width={300} lazyLoadEmojis={true} className='text-sm' onEmojiClick={handleEmojiClick} open={showPicker}/>
        </div>
        
        </div>
        
        <button className={`w-[20%] py-2 rounded-md text-white font-bold ${text?"bg-emerald-400":"bg-gray-500"}`}>Send</button>
      </form>
    </div>
  )
}
