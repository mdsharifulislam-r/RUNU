"use server"

import { cookies } from "next/headers";

export async function changePassword(body:any) {
    try {
        const token = (await cookies()).get('auth-token')?.value
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password`,{
            method:"PUT",
            body:JSON.stringify(body),
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                "authorization":`${token}`
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
        
    }
}