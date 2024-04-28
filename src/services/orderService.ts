import axios from '@/library/axios'
import type { IOrder } from '@/views/Order/Steps/types'


export async function postOrder(order: unknown) {
  const { data } = await axios.post(`/base-order/user`, order)
  return data
}

export async function getOrderByUser(username: string) {

  const { data } = await axios.get("/base-order/by-user", {
    params: {
      username
    }
  })
  return data
}
export async function getOrderList() {
    const { data } = await axios.get("/base-order/get-all");
    return data
}
export async function updateOrder(id: number, request: any) {
  try {
    const { data } = await axios.put(`/base-order/user/update/${id}`, request, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function setCost(id: number, request: number, distance: number) {
  try {
    const { data } = await axios.put(`/base-order/set-cost/${id}?cost=${request}&distance=${distance}`,)
    
    return data
  } catch (error) {
    console.log(error)
  }
}
