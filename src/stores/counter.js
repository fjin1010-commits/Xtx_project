import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  const fetchName = async () => {
    // 模拟异步请求
    await new Promise((resolve) => setTimeout(resolve, 1000));
    name.value = "Async Rabbit";
  }

  return { count, name, doubleCount, increment, fetchName };
});
