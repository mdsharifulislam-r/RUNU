'use server'

import { cookies } from "next/headers"

export async function loginUser(values:any) {
    try {
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
            (await cookies()).set('auth-token',data.token)
          }
          return data
    } catch (error) {
        
    }
}