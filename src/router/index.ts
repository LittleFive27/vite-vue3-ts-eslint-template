import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    redirect: '/welcome'
  },
  {
    path: '/index',
    redirect: '/welcome'
  },
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    component: () => import('@/views/HelloWorld.vue'),
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
export default router
