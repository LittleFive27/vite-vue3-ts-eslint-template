import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '@/store'

import '@/assets/styles/reset.scss'
import '@/assets/styles/scrollbar.scss'
import '@/assets/styles/common.scss'

const app = createApp(App)

app.use(store)

app.mount('#app')
