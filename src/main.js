import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/src/index.scss'
import '@/styles/common.scss'
import router from './router'
import { lazyPlugin } from './directives/lazyPlugin'
import componentsPlugin from './components'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia).use(router).mount('#app')
app.use(componentsPlugin)
app.use(lazyPlugin)