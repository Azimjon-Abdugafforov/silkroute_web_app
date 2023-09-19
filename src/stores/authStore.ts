import { Login } from '@/services/authService';
import { IUser } from '@/views/Pages/Types/types';
import { defineStore } from 'pinia';
import {useToast} from 'vue-toastification'


const toast = useToast()



export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || '',
    user: {} as IUser,
    status: '',
  }),
  actions: {
    async login(data: IUser) {
      const res = await Login(data);

      if(res){
        toast.success(`Xush kelibsiz ${res.name}!`)
        localStorage.setItem('access_token', res.bearer)
      }
      
      return res;
    },
  },
});
