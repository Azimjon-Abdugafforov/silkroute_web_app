import { login, resetPassword } from '@/services/authService';
import { IUser } from '@/views/Pages/Types/types';
import { defineStore } from 'pinia';
import {useToast} from 'vue-toastification'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || '',
    user: {} as IUser,
    status: '',
    resetPass: false,
    loading: false, 
    userDetails: {} as IUser,
  }),
  actions: {
    async login(data: IUser) {
      const res = await login(data);

      if(res){
        toast.success(`Welcome  ${res.user.userName}!`)
        localStorage.setItem('access_token', res.bearer)
        localStorage.setItem('name', res.user.userName)
        localStorage.setItem('role', res.user.role.role_name)
      }
      else{
        toast.error(res.errormessage)
      }
      return res;
    },
    async resetPassword(userName: string){
      try {
        const data = await resetPassword(userName)
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
      }
    }
  },
});
