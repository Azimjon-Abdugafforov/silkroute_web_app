import {getEmployeeList} from '@/services/employee.service'
import { defineStore } from 'pinia'
import {useToast} from 'vue-toastification'
import type {IUsers, ICurrentUser} from '@/views/Employee/types/types'

const toast = useToast()
export const useEmployeeStore = defineStore('employee', ({
  state:()=>({
    userList: [] as IUsers[],
    currentUser: {} as ICurrentUser,
    isEditing: false
  }),
  actions: {
    async getEmployees(){
      try {
        const data = await getEmployeeList()

      if(data){
        this.userList = data
      }
     


      return data
      } catch (error) {
        console.log(error);
        
      }
      
    }
  }
}))