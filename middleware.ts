import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const paths1 = ["login","register"]
const paths2 = ["profile","chat","request","add-friend"]
export async function middleware(Request:NextRequest) {
    try {
        const url = await Request.nextUrl.pathname
        const sliceUrl = url.slice(1,url.length)
        const token = (await cookies()).get('auth-token')?.value
        if(token && paths1.includes(sliceUrl)){
            return NextResponse.redirect(new URL("/chat",Request.url))
        }

        if(!token && paths2.includes(sliceUrl)){
            return NextResponse.redirect(new URL("/login",Request.url))
        }
        
        
    } catch (error) {
        
    }
}

export const config = {
    matcher:['/:path*']
}