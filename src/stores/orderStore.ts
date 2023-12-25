import { defineStore } from "pinia";

export const useOrderStore = defineStore('order', ({
  state:()=>({
    btnName: "Move Date",
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    orderDetails: {
      fromRegion: Number,
      fromDistrict: Number,
      toRegion: Number,
      toDistrict: Number,
    }

  }),
  actions:{
    async getOrderDetails(){
      console.log('here')
    }
  }
}))