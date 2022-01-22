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

const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim().split('=');
      if (c[0] === name) {
          return c[1];
      }
  }
  return "";
}

router.beforeEach( (to, from , next ) => {

  const isLogin = store.state.admin.isLogin;

  if (to.path !== '/login' && !isLogin  && !getCookie('connect.sid') ) {
    // console.log('router push /login');
    next('/login')
  }
  else {
    next()
  }

})

export default router;
