'use client'
import React, { useState } from 'react'
import InputItem from '../Common/InputItem'
import LoadingButton from '../Common/LoadingButton/LoadingButton'
import { useFormik } from 'formik'
import { loginValidation, registerValidation } from '@/validation/register.validation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { setUser } from '@/lib/features/user.reducer'
import Image from 'next/image'
import Link from 'next/link'

export default function MainContainer() {
  const initalState = {
 
    email:"",
    password:"",


  }

  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isLoading,setIsLoading]=useState(false)
  const {values,errors,handleChange,handleSubmit} = useFormik({
    validationSchema:loginValidation,
    initialValues:initalState,
    onSubmit:async (values,action)=>{
     
      setIsLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(values),
        credentials:"include"
      })
      const data = await res.json()
   
      
      if(data.status){
        setIsLoading(false)
        toast.success(data.message)
        action.resetForm()
        dispatch(setUser(data.data))
        router.push("/chat")
      }else{
        setIsLoading(false)
        toast.error(data.message)
      }
    }
  })

  
  return (
    <div className='container py-5 md:py-0 mx-auto min-h-screen gap-3  flex-col md:flex-row flex justify-center place-items-center'>
        <div className='md:w-1/2 flex flex-col place-items-center'>
      <Image src={"/images/register.png"} width={1000} className='w-1/2' height={1000} alt=''/>
      <div className='md:w-[60%] w-[90%] text-center md:text-left'>
        <h1 className='text-4xl mb-2 font-bold text-gray-100'>Log in to <span className='text-emerald-500'>RUNU</span></h1>
        <p className='text-sm  text-slate-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sequi dicta, amet architecto voluptate illum nemo hic explicabo atque cum!</p>
      </div>
      </div>
      <div className='md:w-1/2 w-full flex flex-col justify-center place-items-center'>
      <h1 className='text-4xl text-gray-100 mb-4 font-semibold'>Login <span className=' text-emerald-500'>Here</span></h1>
      <form onSubmit={handleSubmit} action="" className='md:w-[80%] w-[90%] min-h-60 bg-gray-800 rounded-md p-5'>
    
        <InputItem
        title='Email Address'
        name='email'
        id='email'
        placeholder='Email Address'
        type='email'
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        />
        <InputItem
        title='Password'
        name='password'
        id='password'
        placeholder='Password'
        type='password'
        value={values.password}
        error={errors.password}
        onChange={handleChange}
        />
       
        <LoadingButton isLoading={isLoading} className='w-full py-2 font-bold mt-3 rounded-md bg-emerald-500 text-white'>Submit</LoadingButton>
      </form>
      <div className='mt-2 text-slate-300'>If you dont have a account. <Link href={"/register"} className='text-emerald-500'>Register Here</Link></div>
      </div>
   
    </div>
  )
}
