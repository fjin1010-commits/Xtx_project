import httpInstance from "@/utils/http";
 // 假设你要获取的分类ID为1
export const getCategoryAPI = (categoryId) => {
  return httpInstance({
    url: "/category",
    params:{
      id: categoryId 
    }
  });
}