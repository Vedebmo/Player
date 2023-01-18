import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Playing.vue')
    },
    {
      path: '/languages',
      name: 'languages',
      component: () => import('@/views/Languages.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/Account.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/views/Edit.vue')
    }
  ]
})

export default router
