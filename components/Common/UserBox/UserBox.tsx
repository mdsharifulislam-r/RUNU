'use client'
import { getSingleUser } from '@/lib/helpers/getSingleUser'
import { useAppSelector } from '@/lib/hooks'
import { MessageType, UserType } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

export default function UserBox({userId,socketId}:{userId:number,socketId:string}) {
    const localUser = useAppSelector(state=>state.userReducer.user)
    const reload = useAppSelector(state=>state.userReducer.reload)
    const [size,setSize]=useState(0)
    const [user,setUser]=useState<UserType>()
    useEffect(()=>{
        getSingleUser(userId).then(data=>
            setUser(data)
        )
    },[])

    const id = userId>(localUser?.user_id||0)?`${localUser?.user_id}${userId}`:`${userId}${localUser?.user_id}`
    const socket = useMemo(()=>io(process.env.NEXT_PUBLIC_SOCKET_URL),[])

  useEffect(()=>{
    setSize(window.innerWidth)
    socket.emit('join-room',id)
  },[])

  const [message,setMessage]=useState<MessageType>()
  useEffect(()=>{
    socket.on("last-message",(data)=>{
      setMessage(data)
    })
  },[reload])
  
  window.addEventListener('resize',()=>{
    setSize(window.innerWidth)
  })
  
  
  
  return (
    <Link href={size>600?`/chat/${id}`:`/small-chat/${id}`} className='w-full px-5 py-3 bg-slate-700 rounded-md relative flex gap-3'>
        {socketId &&<div className="absolute size-3 rounded-full bg-emerald-500 top-3 "></div>}
      <Image src={user?.image||"/images/avtar.jpeg"} alt='' width={200} height={200}  className='w-16 h-16 rounded-md object-cover'/>
      <div>
        <h1 className='text-xl text-gray-100'>{user?.name}</h1>
        {message?.content && <p>{message?.content }</p>}
      </div>
    </Link>
  )
}
