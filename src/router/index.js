import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'error',
      component: () => import('@/views/404.vue')
    },
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
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUp.vue')
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
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('@/views/Forgot.vue')
    },
    {
      path: '/songs',
      name: 'songs',
      component: () => import('@/views/SongsManager.vue')
    }
  ]
})

export default router
