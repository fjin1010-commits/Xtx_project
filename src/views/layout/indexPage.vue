<script setup>
import layoutNav from '@/components/layoutNav.vue';
import layoutHeader from '@/components/layoutHeader.vue';
import layoutFooter from '@/components/layoutFooter.vue';
import layoutFixed from '@/components/layoutFixed.vue';
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore(); 

onMounted(() => {
  // 在组件挂载时获取分类数据
 categoryStore.fetchCategories();
});
</script>

<template>
  <div>
    <layoutNav />
    <layoutFixed />
    <layoutHeader />
    <router-view />
    <layoutFooter />
    <!-- 这里可以放其他内容 -->
    
  </div>
</template>
