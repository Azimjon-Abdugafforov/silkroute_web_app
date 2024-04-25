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

    console.log(request);
    

    const { data } = await axios.put(`/base-order/user/update/${id}`, request, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(data);
    
    return data;
  } catch (error) {
    console.log(error);
  }
}
