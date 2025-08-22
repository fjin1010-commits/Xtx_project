import httpInstance  from "@/utils/http";

export const getCategory = () => {
  // 使用 httpInstance 进行 API 请求
  return httpInstance({
    url: "/home/category/head"
  });
};