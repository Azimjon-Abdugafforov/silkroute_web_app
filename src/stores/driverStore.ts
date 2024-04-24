import {postDriver} from "@/services/driverService"
import { IOrder } from "@/views/Order/Steps/types";
import { defineStore } from "pinia";
import {useToast} from 'vue-toastification'


const toast = useToast()
export const useDriverStore = defineStore("driver", {
  state: () => ({
    driverList: [] as any[],
    
    isEditing: false
  }),
  actions: {
    async postDriver(details: unknown){
      try {
        const data = await postDriver(details)
        if(data){
          toast.success('Driver added successfully')
        }
        return data
      } catch (error) {
        toast.error('Failed to add driver')
        console.log(error);
      }
    }
  }
})
