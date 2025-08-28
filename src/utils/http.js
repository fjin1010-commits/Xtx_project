import axios from "axios";
import { useUserStore } from "@/stores/user";

import router from "@/router";

const httpInstance = axios.create({
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net", // 替换为你的API基础URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore();
  if(userStore.userInfo.token){ 
    config.headers.Authorization = `Bearer ${userStore.userInfo.token}`;
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore();
  if(e.response.status === 401){
    userStore.clearUserInfo();
    router.replace('/login')
  }
  
  return Promise.reject(e)

})

export default httpInstance;
