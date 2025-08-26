import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '@/api/user';
import { ElMessage } from 'element-plus';
import router from '@/router';


export const useUserStore = defineStore('user',() =>{
  const userInfo = ref({});
  
  const handleLogin = async ({account,password}) => {
    const res = await loginAPI({ account, password });
    console.log(res);
    userInfo.value = res.result;
    if (res) {
      ElMessage.success('登录成功');
      router.replace('/');
    }
    
  };

  const clearUserInfo = () => { userInfo.value = {} };
  return { handleLogin, userInfo, clearUserInfo };
},{
    persist: true,
  })