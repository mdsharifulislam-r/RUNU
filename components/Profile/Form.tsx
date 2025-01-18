'use client'
import React, { useState } from 'react'
import LoadingButton from '../Common/LoadingButton/LoadingButton'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useFormik } from 'formik'
import { updateUser } from '@/lib/helpers/updateUser'
import toast from 'react-hot-toast'
import { setUser } from '@/lib/features/user.reducer'
import ChangePassword from './ChangePassword'


export default function Form() {
    const user = useAppSelector(state=>state.userReducer.user)
    const dispatch = useAppDispatch()
    const [loading,setIsLoading]=useState(false)
    const initialValues = {
        name:user?.name,
        email:user?.email
    }
    const {values,handleSubmit,handleChange} = useFormik({
        initialValues,
        onSubmit:async(values,action)=>{
            setIsLoading(true)
            const data = await updateUser(values)
            if(data.status){
                toast.success(data.message)
                dispatch(setUser(data.data))
                setIsLoading(false)
            }else{
                toast.error(data.message)
                setIsLoading(false)
            }
        }
    })

    const [isShow,setIsShow]=useState(false)

    const toggleShow = ()=>{
        setIsShow(!isShow)
    }
  return (
    <div className='md:w-1/2 w-full'>
      <form action="" onSubmit={handleSubmit}>
        <h1 className='text-xl text-emerald-500'>User Information</h1>
        <div className='mt-4'>
            <input type="text" onChange={handleChange} value={values.name} name="name" className='w-full py-2 px-3 bg-slate-700 focus:outline-none' id="" placeholder='Full Name' />
            <input type="text" onChange={handleChange} value={values.email} name="email" className='w-full py-2 px-3 bg-slate-700 focus:outline-none mt-3' id="" placeholder='Email Address' />
            <div>
            <LoadingButton isLoading={loading} className='bg-emerald-500 text-white px-5 py-2 mt-3'>Update</LoadingButton>
            <button onClick={toggleShow} type='button' className='bg-red-500 ml-3 text-white px-5 py-2 mt-3'>Change Password</button>
            </div>
        </div>
      </form>
      {isShow &&<ChangePassword isShow={toggleShow}/>}
    </div>
  )
}
