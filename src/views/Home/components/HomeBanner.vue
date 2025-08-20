<script setup>
import { getBanner } from "@/api/getBannerAPI";
import { onMounted } from "vue";
import { ref } from "vue";
const bannerList = ref([]);

const fetchBanners = async () => {
  const res = await getBanner(); // 检查这里的内容
  console.log('接口返回：', res); // 检查这里
  bannerList.value = res.result; // 确认 res.result 是否为数组
};
onMounted(() => {
  fetchBanners();
});
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img
          :src="item.imgUrl"
          :alt="item.altText"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
