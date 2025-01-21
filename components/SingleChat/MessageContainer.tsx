import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import MessageBox from './MessageBox/MessageBox'
import { MessageType } from '@/types/types'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setReload } from '@/lib/features/user.reducer'

export default function MessageContainer({socket,id}:{socket:Socket,id:any}) {
  const [messages,setMessages]=useState<MessageType[]>([])
  const divRef = useRef<HTMLDivElement>(null)
  const user = useAppSelector(state=>state.userReducer.user)
  const audio = new Audio('/audios/bell.mp3')
  const dispatch = useAppDispatch()
  socket.on("message",(message:MessageType[])=>{
    setMessages(prev=>message)
    dispatch(setReload())
    audio.play()
  })
const reload = useAppSelector(state=>state.userReducer.reload)
  useEffect(()=>{
    socket.emit('get-message',{id,userId:user?.user_id})
    socket.on("get-message",(data)=>{
      setMessages(data)
    })

    document.getElementById("base")?.scrollIntoView({behavior:"smooth"})
  },[reload])

  useEffect(()=>{
    document.getElementById("base")?.scrollIntoView({behavior:"smooth"})
  },[reload,messages])
  const showMessage = messages?.map(item=>(
    <MessageBox message={item} key={item.message_id}/>
  ))
  return (
    <div className='w-full flex-grow overflow-y-scroll'>
      {showMessage}
      <div id='base'></div>
    </div>
  )
}
