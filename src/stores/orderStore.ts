import { defineStore } from "pinia";

export const useOrderStore = defineStore('order', ({
  state:()=>({
    btnName: "Move Date"
  }),
  actions:{
    async getOrderDetails(){
      console.log('here')
    }
  }
}))