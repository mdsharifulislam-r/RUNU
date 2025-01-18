'use client'
import React, { useEffect, useMemo } from 'react'
import HeaderSection from './HeaderSection'
import MessageContainer from './MessageContainer'
import ChatSection from './ChatSection'
import { io } from 'socket.io-client'
import { useParams } from 'next/navigation'

export default function MainContainer() {
  const socket = useMemo(()=>io(process.env.NEXT_PUBLIC_SOCKET_URL),[])
  const {id} = useParams()
  useEffect(()=>{
    socket.emit('join-room',id)
  },[])
  


  return (
    <div className='w-full h-[100vh] md:h-[90vh] flex flex-col  bg-gray-800 rounded-lg relative overflow-hidden'>
      <HeaderSection/>
      <MessageContainer socket={socket} id={id}/>
      <ChatSection socket={socket} id={id} />
    </div>
  )
}
