import axios from "axios";

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net", // 替换为你的API基础URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
httpInstance.interceptors.request.use(  
  (config) => {
    // 可以在这里添加请求头或其他配置
    // 例如：config.headers['Authorization'] = 'Bearer token';
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (response) => {
    // 可统一处理响应数据
    return response.data;
  },
  (error) => {
    // 可统一处理错误，如弹窗提示等
    // if (error.response) { ... }
    return Promise.reject(error);
  }
);

export default httpInstance;
