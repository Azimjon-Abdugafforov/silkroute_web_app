import axios from '@/library/axios'
import type { IOrder } from '@/views/Order/Steps/types'

export async function getOrderList(){
  const {data} = await axios.get(`/Order`)
  return data
}
export async function postOrder(order:unknown){
  console.log(order)
  const {data} = await axios.post(`/base-order/user`,order)
  console.log(data)
  return data
}