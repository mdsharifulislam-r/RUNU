'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function Hero() {
  


  return (
    <div className='w-full py-6 px-3 min-h-screen bg-gray-900'>
      <div className="container mx-auto flex md:flex-row flex-col place-items-center">
        <div className='md:w-1/2 w-full flex justify-center place-items-center md:h-screen'>
        <Image src={"/images/hero.png"}  alt='' width={500} height={500}/>
        </div>
        <div className='md:w-1/2 w-full md:h-screen flex  justify-center flex-col'>
        <h1 className='md:text-6xl text-4xl font-bold text-gray-100 mb-3'>Start Your Chating with <span className='text-emerald-500 '>Runu</span> </h1>
        <p className='text-slate-300'>It is absolutely free . And easy to use. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt doloremque ad dolor qui, natus quibusdam quaerat similique voluptatibus cumque totam.</p>
        <div className='mt-6'>
          <Link href={"/login"} className='px-6 py-3 bg-blue-500 text-white'>Sign In</Link>
          <Link href={"/register"} className='px-6 py-3 ml-5 bg-emerald-500 text-white'>Create Account</Link>
        </div>
        </div>
      </div>
    </div>
  )
}
