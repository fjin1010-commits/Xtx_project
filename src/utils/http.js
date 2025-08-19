import axios from "axios";

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net", // 替换为你的API基础URL
  timeout: 10000, // 请求超时时间
});

export default httpInstance;
