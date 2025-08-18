<script setup>
import { onMounted } from 'vue';
import { useCounterStore } from './stores/counter';
import { storeToRefs } from 'pinia';
const counterStore = useCounterStore();
const { count, name, doubleCount } = storeToRefs(counterStore); 
onMounted(() => {
  counterStore.fetchName();
}); 


</script>

<template>
  <div>
    <h1>Counter: {{ count }}</h1>
    <h1>Double Counter: {{ counterStore.doubleCount }}</h1>
    <h1>Name: {{ counterStore.name }}</h1>

    <button @click="counterStore.increment">Increment</button>
   

  </div>
</template>

<style scoped></style>
