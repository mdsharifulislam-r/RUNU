import { UserType } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"
import { Socket } from "socket.io-client"
import { getStorLocal, setStorLocal } from "../hooks"

interface InitialState{
    socket:Socket|null,
    user:UserType|null,
    reload:boolean
}

const localUser:UserType|null = getStorLocal('user')

const initialState:InitialState={
    socket:null,
    user:localUser,
    reload:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        getSocket:(state,action)=>{
            state.socket=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
            setStorLocal("user",action.payload)
        },
        setReload:(state)=>{
            state.reload=!state.reload
        },
        
    }
})

export const {getSocket,setUser,setReload} = userSlice.actions
export default userSlice
