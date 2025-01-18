export async function getSingleUser(id:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user/${id}`)
        const data = await res.json()
        return data?.user_id?data:{}
    } catch (error) {
        return {}
    }
}