import httpInstance from "@/utils/http";

export const getProudctAPI = () => {
  return httpInstance({
    url: "/home/goods"
  });
}
