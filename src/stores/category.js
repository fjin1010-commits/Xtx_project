import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategory } from '@/api/getCategoryAPI';

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);

  const fetchCategories = async () => {
    const res = await getCategory();
    // 你可以在这里添加其他逻辑，比如错误处理等
    console.log('获取分类数据:', res); // 调试输出
    if (!res || !res.result) {
      console.error('获取分类数据失败:', res);
      return;
    }
    categories.value = res.result; // 假设 API 返回的数据结构中有 result 字段
  };

  return { categories, fetchCategories };
});
