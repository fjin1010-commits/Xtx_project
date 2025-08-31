import { defineStore } from "pinia";
import { signInAPI, signUpAPI} from "@/api/user";
import bcrypt from 'bcryptjs';
import {ElMessage } from "element-plus";
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: '',
      account:'',
      password:'',
      agree: false,
      confirmPassword:''
    },
  }),
  actions: {
    async signIn() {
      const {account} = this.userInfo;
      const {data, error} = await signInAPI({ account });
      console.log(data,error);
      if(!bcrypt.compareSync(this.userInfo.password, data.password)){
        ElMessage.error('密码错误');
        return; 
      }
      this.userInfo = { ...data, password: '' };
      ElMessage.success('登录成功');
      return data;
    },
    async signUp() {
      const { account, password } = this.userInfo;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const {data,error} = await signUpAPI({ account, password: hashedPassword });
      if(error){
        ElMessage.error('注册失败,用户名可能已存在');
        return;
      }
      ElMessage.success('注册成功,请登录');
      return data;
    },
    logOut(){
      this.$reset();
    }
  },
  persist: true
})