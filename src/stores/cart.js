import { defineStore } from "pinia";
import { ref } from "vue";


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
  const delCart = (id) => {
    cartList.value = cartList.value.filter(item => item.id !== id);
  };
  return { cartList, addCart, delCart };

}, {
    persist: true,
  })