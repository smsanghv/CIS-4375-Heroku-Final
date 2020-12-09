import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/', //http://localhost:8080/
    name: 'Home',
    component: Home
  },
  {
    path: '/about', //http://localhost:8080/about
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/service', //http://localhost:8080/service
    name: 'Service',
    component: () => import('../views/Service.vue')
  },
  {
    path: '/faq', //http://localhost:8080/faq
    name: 'Faq',
    component: () => import('../views/Faq.vue')
  },
  {
    path: '/account', //http://localhost:8080/account
    name: 'Account',
    component: () => import('../views/Account.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login', //http://localhost:8080/login
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: {
      requiresGuest: true
    }
  }
  ]
});

//Conditions to check logged in status and redirect from non accessible pages if necessary depending on that status
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters.isLoggedIn) {
      //Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (Store.getters.isLoggedIn) {
      //Redirect to the Login Page
      next('/account');
    } else {
      next();
    }
  } else {
    next()
  }
});

export default router;
