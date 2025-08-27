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
  const selectedTotalItem = computed(() => cartList.value.filter(item => item.selected).reduce((sum, item) => sum + item.num, 0));
  const totalPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.price * item.num, 0).toFixed(2));
  const selectedTotalPrice = computed(() => cartList.value.filter(item => item.selected).reduce((sum, item) => sum + item.price * item.num, 0).toFixed(2));
  const delCart = (id) => {
    cartList.value = cartList.value.filter(item => item.id !== id);
  };

  const checkedState = (item, selected) => {
    const target = cartList.value.find(i => i.id === item.id);
    if (target) {
      target.selected = selected;
    }
  };

  const isAll = computed(() => cartList.value.every(item => item.selected));

  const tickAll = (selected) => {
    cartList.value.forEach(item => {
      item.selected = selected;
    });
  };
  return { cartList, addCart, delCart, totalItem, totalPrice, checkedState, isAll, tickAll, selectedTotalItem, selectedTotalPrice};

}, {
    persist: true,
  })