import { onMounted } from "vue";
import { ref } from "vue";
import { getBanner } from '@/api/home';

export const useBanner = () => {

  const bannerList = ref([]);

const fetchBanners = async () => {
  const res = await getBanner(2); // 检查这里的内容// 检查这里
  bannerList.value = res.result; // 确认 res.result 是否为数组
}
onMounted(() => {
  fetchBanners();
})
return {
  bannerList
}};