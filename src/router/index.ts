import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { clearPlaceholderLoading } from '@/utils/placeholder-loading'
import Home from '@/views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'Home'
    }
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
  clearPlaceholderLoading()
})
export default router
