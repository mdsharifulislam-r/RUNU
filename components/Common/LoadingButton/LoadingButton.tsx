"use client"
import React, { ReactNode } from 'react'
import ButtonLoader from './ButtonLoader'
import { useFormStatus } from 'react-dom'

import toast from 'react-hot-toast'

interface props{
  isLoading?:boolean,
  className?:string,
  children?:ReactNode,
  onClick?:React.MouseEventHandler<HTMLButtonElement>
  
}
export default function LoadingButton({isLoading=false,className,children,onClick}:props) {
  const { pending } = useFormStatus();


  return (
    <button onClick={onClick}  type='submit' style={{cursor:pending || isLoading?"progress":"pointer"}} disabled={pending || isLoading?true:false} className={className}>{pending || isLoading?<ButtonLoader/>:children}</button>
  )
}