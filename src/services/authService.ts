import axios from '@/library/axios'
import type {IUser} from '@/views/Pages/Types/types'

export async function login(req:IUser ){
    const {data} =  await axios.post('/login', req)
    
    return data
}
export async function resetPassword(userName: string){
  const {data} = await axios.put(`/forgot-password?username=${userName}`)
  return data
}

