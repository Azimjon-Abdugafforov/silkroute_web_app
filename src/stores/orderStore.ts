// orderStore.ts

import { defineStore } from "pinia";
import type { IOrder } from "@/views/Order/Steps/types";

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

    // Update order data
    updateOrder(newOrder: IOrder) {
      this.order = { ...this.order, ...newOrder };
    },
  },
}));
