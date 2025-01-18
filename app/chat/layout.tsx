
import SideBar from '@/components/Chat/SideBar'
import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <div className='w-full min-h-screen bg-gray-900 p-5'>
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
