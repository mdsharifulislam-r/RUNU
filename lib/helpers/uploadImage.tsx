"use client"
export async function uploadImage(files:any){
    const formData = new FormData()
    formData.append('file',files[0])
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUD_PRESET_SECRET||"")
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,{
        method:"POST",
        body:formData
    })
    const data = await res.json()


    if(data.asset_id){
        return data?.secure_url
    }
    return ""
    
}