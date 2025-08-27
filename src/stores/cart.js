import { tryOnBeforeMount } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from "vue";

export const useCartStore = defineStore('cart',() =>{
  const cartList = ref([]);
  const addCart = (goods) => {
    const item = cartList.value.find((item) => item.id === goods.id);
    if (item) {
      item.num++;
    } else {
      cartList.value.push(goods);
    }
  };
  const totalItem = computed(() => cartList.value.reduce((sum, item) => sum + item.num, 0));
  const totalPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.price * item.num, 0).toFixed(2));
  const delCart = (id) => {
    cartList.value = cartList.value.filter(item => item.id !== id);
  };
  return { cartList, addCart, delCart, totalItem, totalPrice };

}, {
    persist: true,
  })