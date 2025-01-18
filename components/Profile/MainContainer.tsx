import React from 'react'
import ImageBox from './ImageBox'
import Form from './Form'

export default function MainContainer() {
  return (
    <div className='md:w-[60%]  w-[90%] bg-gray-800 flex place-items-center flex-col md:flex-row md:gap-0 gap-3 p-4'>
      <ImageBox/>
      <Form/>
    </div>
  )
}
