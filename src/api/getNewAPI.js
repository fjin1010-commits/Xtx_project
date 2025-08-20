import httpInstance from "@/utils/http";

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const getNewAPI = () => {
  return httpInstance({
    url: "/home/new"
  })
};
