import httpInstance from "@/utils/http";

export const getHotAPI = () => {
  return httpInstance.get("/home/hot");
};
