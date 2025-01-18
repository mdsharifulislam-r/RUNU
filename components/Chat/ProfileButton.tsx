'use client'
import { setUser } from '@/lib/features/user.reducer'
import { logOutUser } from '@/lib/helpers/logoutUser'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function ProfileButton() {
    const user = useAppSelector(state=>state.userReducer.user)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const logout = async ()=>{
      const data = await logOutUser()
        if(data.status){
            toast.success(data.message)
            dispatch(setUser(null))
            router.push("/login")
        }else{
            toast.error(data.message)
        }

    }
  return (
    <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-8 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src={user?.image||"/images/avtar.jpeg"} />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
        <Link href={"/profile"} className="justify-between">
          Profile
         
        </Link>
      </li>
     
      <li><button onClick={logout}>Logout</button></li>
    </ul>
  </div>
  )
}
