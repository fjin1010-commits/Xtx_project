import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/src/index.scss'
import '@/styles/common.scss'
import router from './router'
import { lazyPlugin } from './directives/lazyPlugin'
import componentsPlugin from './components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia).use(router).mount('#app')
app.use(componentsPlugin)
app.use(lazyPlugin)