import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { clearPlaceholderLoading } from '@/utils/placeholder-loading'

const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach(() => {
  clearPlaceholderLoading()
})
export default router
