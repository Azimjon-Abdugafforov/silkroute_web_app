import { defineStore } from "pinia";
import type { IOrder } from "@/views/Order/Steps/types";
import {postOrder, getOrderByUser, getOrderList} from '@/services/orderService'
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
    myOrders: {} as [IOrder],
    allOrders: [] as IOrder[] 
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
        const startLat = order.startPoint.lat.toString();
        const startLng = order.startPoint.lng.toString();
        const endLat = order.endPoint.lat.toString();
        const endLng = order.endPoint.lng.toString();
    
        const o = {
          fromRegion: order.fromRegion.id,
          toRegion: order.toRegion.id,
          fromDistrict: order.fromDistrict.id,
          toDistrict: order.toDistrict.id,
          loadDayTime: order.loadDayTime,
          startPoint: [startLat, startLng],
          endPoint: [endLat, endLng],
          paymentType: order.paymentType,
          homeType: order.homeType,
          email: order.email,
          phoneNumber: order.phoneNumber,
          fullName: order.firstName + " " + order.lastName,
          services: order.services
        };
    
    
        const data = await postOrder(o);
    
        if (data.responseCode === 200) {
          toast.success('Your order successfully placed!');
        } else {
          toast.error(data.errormessage);
        }
    
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    

    async getOrderByUsername(username: string){
      try {
        const data = await getOrderByUser(username)
        this.myOrders = data
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async getAllOrders(){
      try {
        const data = await getOrderList();
        this.allOrders = data;
        return data;  
      } catch (error) {
        return error
      }
    }

    

  },
}));

function formatISODateToReadable(dateStr: string): string {
  const date = new Date(dateStr);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleDateString('en-US', options) + ' ' + date.toLocaleTimeString('en-US', options);
}
