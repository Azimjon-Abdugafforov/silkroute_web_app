import axios from "@/library/axios"
import { IOrder } from "@/views/Order/Steps/types"

export async function postDriver(details: unknown){
  try {
    const {data} = await axios.post('/driver', details,
      {headers: {'Content-Type': 'multipart/form-data'}}
    )
    
    return data
  } catch (error) {
    return error
  }
}

export async function getDriverOrders(email: any){
  try {
    const {data}  = await axios.get(`/driver/get-driver-order?email=${email}` )
    
    return data
  } catch (error) {
    return error
  }
}