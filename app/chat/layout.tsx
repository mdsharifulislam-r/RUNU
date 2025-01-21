
import SideBar from '@/components/Chat/SideBar'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Runu | Chat",
  description: "The Real Time Chatting Application",
};

export default function layout({children}:{children:ReactNode}) {
  return (
    <div className='w-full min-h-screen bg-gray-900 md:p-5 p-0'>
      <div className='container mx-auto flex gap-3'>
        <div className='md:w-[30%] w-full relative'>
            <SideBar/>
        </div>
        <div className='md:block hidden w-[70%]'>
            {children}
        </div>
      </div>
    </div>
  )
}
