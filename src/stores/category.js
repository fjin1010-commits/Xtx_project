import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategory } from '@/api/layout';

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);

  const fetchCategories = async () => {
    const res = await getCategory();
    categories.value = res.result;
  };

  return { categories, fetchCategories };
});
