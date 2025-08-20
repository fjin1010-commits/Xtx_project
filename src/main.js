import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/src/index.scss'
import '@/styles/common.scss'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'


const app = createApp(App)

const pinia = createPinia()

app.use(pinia).use(router).mount('#app')

app.directive('img-lazy', {
  mounted(el, binding) {
  console.log('img-lazy directive mounted', el, binding.value);
  useIntersectionObserver(
    el,
    ([entry]) => {
      if (entry.isIntersecting) {
        el.src = binding.value
      }
    },
  )
}
})
