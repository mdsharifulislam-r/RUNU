'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import UserBox from '../Common/UserBox/UserBox'
import { getSocket } from '@/lib/features/user.reducer'
import { FaUserPlus } from "react-icons/fa6";
import Link from 'next/link'
import { BiMessage } from 'react-icons/bi'
import ProfileButton from './ProfileButton'
export default function SideBar() {
  const socket = useMemo(()=>io(process.env.NEXT_PUBLIC_SOCKET_URL),[])
  const user = useAppSelector(state=>state.userReducer.user)
  const dispatch = useAppDispatch()
  const [onlineUsers,setOnlineUsers]=useState<{userId:number,socketId:string}[]>([])
  const [request,setRequest]=useState<string[]>([])
  const reload = useAppSelector(state=>state.userReducer.reload)
  useEffect(()=>{
    socket.emit("get-online",user?.user_id)
  
  },[socket.id])

  const func = () =>{
    socket.emit('get-friends',user?.user_id)
  socket.on("get-friends",(users)=>{
    if(users==onlineUsers){
      return
    }
    setOnlineUsers(users)
 
    
    
  })
  }
  useEffect(()=>{
    socket.emit('get-request',user?.user_id)
    socket.on("get-request",(users)=>{
      
      setRequest(users)
      
    })
  },[socket,reload])
 
  useEffect(()=>{
    func()
   setTimeout(func,2000)
    
  },[reload,socket])
  
  const showUsers = onlineUsers?.map(item=>(
    <UserBox userId={item.userId} socketId={item.socketId} key={item.userId}/>
  ))
  const [hydred,serHydred]=useState(false)
  useEffect(()=>serHydred(true),[])
  return (
    <div  className='w-full h-[100vh] md:h-[90vh] overflow-y-scroll bg-gray-800 rounded-xl '>
     <div className="header p-5 sticky top-0 bg-gray-800 z-10">
        <div className=' flex justify-between place-items-center'>
            <span className="text-gray-100 text-2xl font-bold">Chats</span>
            <div className='flex place-items-center gap-4'>

            
            <div className=''>
              <Link href={"/request"} className=' p-2 rounded-full text-white relative bg-emerald-500 block'>
             {request?.length ? <div className="absolute text-[10px] rounded-full bg-red-500 px-2 py-1 -top-2 right-0 text-white">
                {request.length}
              </div>:<></>}
              <BiMessage/>
              </Link>
            </div>
            {hydred && <ProfileButton/>}
            </div>
        </div>
        <div>
        <input
            type="text"
            className="w-full py-2 px-4 mt-2 rounded-md bg-slate-700 focus:outline-none "
            placeholder="Search Here"
           
          />
        </div>
     </div>
     <div className='flex flex-col gap-3 w-full p-5 relative z-0'>
     {showUsers}
     </div>
     <Link href={"/add-friend"} className="absolute size-12 bg-emerald-500 bottom-8 left-8 text-white flex justify-center items-center rounded-full">
      <FaUserPlus/>
     </Link>
    </div>
  )
}
