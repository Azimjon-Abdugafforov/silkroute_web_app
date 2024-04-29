import { defineStore } from "pinia";
import type { IOrder } from "@/views/Order/Steps/types";
import {postOrder, getDriverArchive, getClientArchievList, rateOrder, startShip,finish, getOrderByUser, getOrderList, updateOrder, setCost} from '@/services/orderService'
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
    myOrders: {} as IOrder,
    allOrders: [] as IOrder[],
    currentOrder: {} as IOrder,
    isEditing: false,
    driverArchives: [] as IOrder[],
    clientAarchives: [] as IOrder[]
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
          fullName: order.fullName,
          services: order.services,
          status: "CREATED"
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
    },
    async startShippingOrder(id: number){
      try {
        const data = await startShip(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },  

    async setOrderCost(id : number, cost: number, distance: number){
      try {
        const data = await setCost(id, cost, distance)
        return data
      } catch (error) {
        return error
      }
    },

    async userUpdateOrder(id: number, request: any) {
      try {
        const data = await updateOrder(id, request)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async finishOrder(id: number){
      try {
        const data = await finish(id)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async rateOrder(id: number, rate: number){  
      try {
        const data = await rateOrder(id, rate)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async getDriverArchives(){
      try {
        const data = await getDriverArchive(localStorage.getItem('name') as string )
        this.driverArchives = data
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async getClientArchives(){
      try {
        const data = await getClientArchievList(localStorage.getItem('name') as string )
        this.clientAarchives = data
        return data
      } catch (error) {
        console.log(error)
      }
    }
    

  },
}));



