import {postDriver, getDriverOrders} from "@/services/driverService"
import { IOrder } from "@/views/Order/Steps/types";
import { defineStore } from "pinia";
import {useToast} from 'vue-toastification'


const toast = useToast()
export const useDriverStore = defineStore("driver", {
  state: () => ({
    driverList: [] as any[],
    currentDriverOrder: {} as IOrder,
    
    isEditing: false
  }),
  actions: {
    async postDriver(details: unknown){
      try {
        const data = await postDriver(details)
        
        if(!data.result ){
          toast.error('Dubplicate driver found')
        }
        if(data.result){
          toast.success('Driver added successfully')
        }
        return data
      } catch (error) {
        toast.error('Failed to add driver')
        console.log(error);
      }
    },
    async getDriverOrders(){
      try {
        const userMail  = localStorage.getItem('name') 
        const data = await getDriverOrders(userMail)
        this.currentDriverOrder = data 
              
  
        return data
      } catch (error) {
        return error
      }
    }
  }
})
