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

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}