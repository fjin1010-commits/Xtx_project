import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/src/index.scss'
import '@/styles/common.scss'
import router from './router'




const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
