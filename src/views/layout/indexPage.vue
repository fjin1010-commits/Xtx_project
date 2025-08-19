<script setup>
import layoutNav from '@/components/layoutNav.vue';
import layoutHeader from '@/components/layoutHeader.vue';
import layoutFooter from '@/components/layoutFooter.vue';
</script>

<template>
  <div>
    <layoutNav />
    <layoutHeader />
    <router-view />
    <layoutFooter />
    <!-- 这里可以放其他内容 -->
    
  </div>
</template>
