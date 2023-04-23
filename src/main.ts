import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '@/store'
import router from '@/router'

import '@/assets/styles/reset.scss'
import '@/assets/styles/scrollbar.scss'
import '@/assets/styles/common.scss'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
