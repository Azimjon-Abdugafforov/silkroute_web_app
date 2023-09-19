import axios from '@/library/axios'
import type {IUser} from '@/views/Pages/Types/types'

export async function Login(req:IUser ){
    const {data} =  await axios.post('/Auth/Login', req)
    return data
}
