import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { clearPlaceholderLoading } from '@/utils/placeholder-loading'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    redirect: '/home'
  },
  {
    path: '/index',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/welcome',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'HelloWorld'
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
