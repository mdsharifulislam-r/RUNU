'use client'
import { getSingleUser } from '@/lib/helpers/getSingleUser'
import { useAppSelector } from '@/lib/hooks'
import { MessageType, UserType } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

export default function UserBoxAdd({userId,socketId,accept}:{userId:number,socketId:string,accept?:boolean}) {
    const localUser = useAppSelector(state=>state.userReducer.user)
    const router = useRouter()
    const [user,setUser]=useState<UserType>()
    useEffect(()=>{
        getSingleUser(userId).then(data=>
            setUser(data)
        )
    },[])

    const id = userId>(localUser?.user_id||0)?`${localUser?.user_id}${userId}`:`${userId}${localUser?.user_id}`
    const socket = useMemo(()=>io(process.env.NEXT_PUBLIC_SOCKET_URL),[])

  useEffect(()=>{
    socket.emit('join-room',id)
  },[])

  const [message,setMessage]=useState<MessageType>()
  socket.on("last-message",(data)=>{
    setMessage(data)
  })

  const func = ()=>{
    if(accept){
      socket.emit('accept-request',{userId:localUser?.user_id,senderId:userId})
      router.push(`/chat/${id}`)
      return
    }
    socket.emit('add-friend',{userId:localUser?.user_id,senderId:userId})
    router.push(`/chat/${id}`)
  }
  return (
    <div onClick={func} className='w-full px-5 py-3 bg-slate-700 rounded-md relative flex gap-3'>
        {socketId &&<div className="absolute size-3 rounded-full bg-emerald-500 top-3 "></div>}
      <Image src={user?.image||"/images/avtar.jpeg"} alt='' width={200} height={200}  className='w-16 h-16 object-cover rounded-md'/>
      <div>
        <h1 className='text-xl text-gray-100'>{user?.name}</h1>
        {message?.content && <p>{message?.content }</p>}
      </div>
    </div>
  )
}
