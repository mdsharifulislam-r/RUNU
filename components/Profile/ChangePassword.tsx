import React, { useState } from 'react'
import LoadingButton from '../Common/LoadingButton/LoadingButton'
import { useFormik } from 'formik'
import { changePassword } from '@/lib/helpers/changePassword'
import toast from 'react-hot-toast'

export default function ChangePassword({isShow}:{isShow:()=>void}) {
    const initialValues={
        oldPass:"",
        newPass:""
    }

    const [isLoading,setIsLoading]=useState(false)
    const {values,handleChange,handleSubmit} = useFormik({
        initialValues,
        onSubmit:async (values,action)=>{
            setIsLoading(true)
            const data = await changePassword(values)
            if(data.status){
                setIsLoading(false)
                toast.success(data.message)
                isShow()
            }else{
                setIsLoading(false)
                toast.error(data.message)
            }
        }
    })
  return (
    <div className='fixed w-full h-full top-0 left-0 bg-black/70 flex justify-center place-items-center z-50'>
    <form onSubmit={handleSubmit} className="md:w-[50%] w-[90%] p-5 bg-slate-800 rounded-md">
        <h1 className='text-gray-100 text-3xl'>Change <span className='text-emerald-500'>Password</span></h1>
        <input type="password" required name="oldPass" value={values.oldPass} onChange={handleChange} className='w-full py-2 px-3 bg-slate-700 focus:outline-none mt-3' id="" placeholder='Old Password' />
        <input type="password" required name="newPass" value={values.newPass} onChange={handleChange} className='w-full py-2 px-3 bg-slate-700 focus:outline-none mt-3' id="" placeholder='New Password' />
        <div>
        <LoadingButton isLoading={isLoading} className='bg-emerald-500 text-white px-5 py-2 mt-3'>Change Password</LoadingButton>
        <button onClick={isShow} type='button' className='bg-blue-500 text-white px-5 py-2 mt-3 ml-4'>
            Cencel
        </button>
        </div>
    </form>
    </div>
  )
}
