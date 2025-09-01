import { defineStore } from "pinia";
import { useUserStore } from "./user";
import {
  getCartAPI,
  addCartAPI,
  removeCartAPI,
  updateAllCheckedStateAPI,
  updateCheckedStateAPI,
} from "@/api/cart";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartList: [],
  }),

  actions: {
    async getCart() {
      const userStore = useUserStore();
      const { data, error } = await getCartAPI(userStore.userInfo.id);
      if (error) {
        console.log("Failed to fetch cart data:", error);
        return;
      }
      this.cartList = data;
    },
    async addToCart(item) {
      await addCartAPI(item);
      await this.getCart();
    },
    async removeCartItem(item) {
      await removeCartAPI(item);
      await this.getCart();
    },
    async updateCheckedState(item, checked) {
      await updateCheckedStateAPI(item, checked );
      await this.getCart(); // 更新本地cartList
    },
    async updateAllCheckedStateAPI(userId, checked) {
      await updateAllCheckedStateAPI(userId, checked);
      await this.getCart(); // 更新本地cartList
    },
  },
  getters: {
    selectedItems: (state) => {
      return state.cartList.filter((item) => item.checked);
    },
    totalItems: (state) => {
      return state.cartList.reduce((total, item) => total + item.count, 0);
    },
    totalPrice: (state) => {
      return state.cartList.reduce((total, item) => total + item.count * item.price, 0).toFixed(2);
    },
    selectedTotalItem: (state) => {
      return state.cartList
        .filter((item) => item.checked)
        .reduce((total, item) => total + item.count, 0);
    },
    selectedTotalPrice: (state) => {
      return state.cartList
        .filter((item) => item.checked)
        .reduce((total, item) => total + item.count * item.price, 0)
        .toFixed(2);
    },
    isAll: (state) => {
      return state.cartList.length > 0 && state.cartList.every((item) => item.checked);
    }
  }
});
