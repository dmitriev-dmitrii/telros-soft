import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users.vue')
  },
  { 
    path: '/users/:id',
    name: 'User',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( (to, from , next ) => {

  const isLogin = store.state.admin.isLogin;

  if (to.path !== '/login' && to.path !== '/' && !isLogin ) {
    // console.log('router push /login');
    next('/login')
  }
  else {
    next()
  }

})

export default router;
