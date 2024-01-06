import { defineStore } from "pinia";
import type { IOrder } from "@/views/Order/Steps/types";
import {postOrder} from '@/services/orderService'
import {useToast} from 'vue-toastification'
const toast = useToast()
export const useOrderStore = defineStore('order', ({
  state: () => ({
    btnName: "Move Date",
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    order: {} as IOrder,
  }),

  actions: {
    async getOrderDetails() {
      console.log('here');
    },

    updateOrder(newOrder: IOrder) {
      this.order = { ...this.order, ...newOrder };
    },

    async submitOrder(order: IOrder) {
      try {
        const o = {
          fromRegion: order.fromRegion.id,
          toRegion: order.toRegion.id,
          fromDistrict: order.fromDistrict.id,
          toDistrict: order.toDistrict.id,
          loadDayTime: order.loadDayTime,
          startPoint: [],
          endPoint: [],
          paymentType: order.paymentType,
          homeType: order.homeType,
          email: order.email,
          phoneNumber: order.phoneNumber,
          fullName: order.firstName + " " + order.lastName,
          services: []
        }
        console.log(o)
        const data =  await postOrder(o)
        if(data.responseCode == 200){
          toast.success('Your order sucessfully placed!')
        }
        else{
          toast.error('try again')
        }
        return data
      } catch (error) {
        console.log(error);
      }
    }

  },
}));
