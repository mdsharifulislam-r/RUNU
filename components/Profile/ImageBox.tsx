'use client'
import { setUser } from '@/lib/features/user.reducer'
import { updateUser } from '@/lib/helpers/updateUser'
import { uploadImage } from '@/lib/helpers/uploadImage'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Image from 'next/image'
import React, { ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import { FaCamera } from 'react-icons/fa6'

export default function ImageBox() {
    const user = useAppSelector(state=>state.userReducer.user)
    const dispatch = useAppDispatch()
    async function imageUpoad(e:ChangeEvent<HTMLInputElement>){
        const image = await uploadImage(e.target.files)
        const data = await updateUser({image})
        if(data.status){
            dispatch(setUser(data.data))
        }else{
            toast.error(data.message)
        }
    }
  return (
    <div className='md:w-1/2 w-full flex place-items-center justify-center'>
      <div className="image md:size-56 size-32 my-4  rounded-full relative overflow-hidden">
        <Image src={user?.image||"/images/avtar.jpeg"} alt='' width={300} height={300} className='w-full h-full object-cover left-0 top-0 absolute z-0'/>
        <div className="absolute w-full h-full top-0 left-0 bg-black/50 flex justify-center place-items-center z-10">
        <input onChange={imageUpoad} type="file" name="" id="profile" hidden />
        <label htmlFor="profile" className='text-white text-4xl cursor-pointer'>
            <FaCamera/>
        </label>
        </div>
      </div>
    </div>
  )
}
