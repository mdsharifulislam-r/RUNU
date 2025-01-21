import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "Runu | Register",
    description: "The Real Time Chatting Application",
  };
  
export default function layout({children}:{children:ReactNode}) {
  return (
    <div>
      {children}
    </div>
  )
}
