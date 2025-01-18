export interface UserType{
    name:string,
    email:string,
    user_id:number,
    image?:string
}

export interface MessageType{
    senderId:string,
    reciverId:string,
    content:any,
    roomId:string,
    type:string,
    seen:boolean,
    message_id?:number
}