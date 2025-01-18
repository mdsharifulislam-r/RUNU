"use server"
import { cookies } from "next/headers"

export async function logOutUser() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,{
            method:"DELETE",
            credentials:"include"
        })

        const data = await res.json()
        if(data.status){
            (await cookies()).set('auth-token',"")
        }
        return data
    } catch (error) {
        
    }
}