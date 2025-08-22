import { ref, onMounted} from 'vue';
import { useRoute, onBeforeRouteUpdate  } from 'vue-router';
import { getCategoryAPI} from '@/api/category';

export const useCategory = () => {
const route = useRoute();// 使用 ref 包装路由参数// 获取路由参数中的分类ID

const categoryData = ref({});
const fetchCategory = async (categoryId) => {
  const response = await getCategoryAPI(categoryId);

  categoryData.value = response.result;

};

onMounted(() => {
  fetchCategory(route.params.id); // 使用 ref 的值
});

onBeforeRouteUpdate((to) =>{
  fetchCategory(to.params.id);
})
return {
  categoryData
}
};