import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/src/index.scss'
import '@/styles/common.scss'
import { getCategory } from './api/test'
import router from './router'



getCategory().then(response => {
  console.log('Category Data:', response.data)
}).catch(error => {
  console.error('Error fetching category:', error)
})
const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
