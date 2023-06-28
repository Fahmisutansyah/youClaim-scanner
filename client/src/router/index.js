import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/claim',
      name: 'claim qr',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
      children: [
        {
          path: ':slug',
          name: 'qr',
          component: () => import('../views/QRView/QRView.vue')
        }
      ]
    },
    {
      path: '/scan',
      name: 'scanner',
      meta: { auth: true },
      component: () => import('../views/ScannerView/ScannerView.vue')
    }
  ]
})
const isAuth = () => {
  if (!localStorage.getItem('claimToken')) {
    return false
  } else {
    return true
  }
}
router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    if (!isAuth()) {
      console.log('hohoh')
      next('/')
    } else {
      next()
    }
  } else {
    if (localStorage.claimToken) {
      next('/scan')
    } else {
      next()
    }
  }
})

export default router
