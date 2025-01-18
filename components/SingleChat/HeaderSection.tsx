import { getSingleUser } from '@/lib/helpers/getSingleUser'
import { useAppSelector } from '@/lib/hooks'
import { UserType } from '@/types/types'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function HeaderSection() {
  const [user,setUser]=useState<UserType>()
  const localUser = useAppSelector(state=>state.userReducer.user)
  const {id}=useParams()
  const anId= id?.toString()
  const [freindId] = anId?.split("").filter(item=>item!=localUser?.user_id.toString())||[]
  useEffect(()=>{
    getSingleUser(parseInt(freindId)).then(data=>setUser(data))
  },[])
  return (
    <div className='w-full py-5 px-4 bg-slate-700'>
      <div>
        <h1 className='text-gray-100 text-xl'>{user?.name}</h1>
      </div>
    </div>
  )
}
