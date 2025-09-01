import { defineStore } from "pinia";
import { addOrderAPI} from "@/api/order";

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderInfo: null, // 新创建订单的信息  
  }),
  actions: {
    async createOrder(orderData) {
      const { data } = await addOrderAPI(orderData);
      if (data) {
        this.orderInfo = data[0]; // 保存新创建的订单信息
      }
    }
  },
  persist: true
})