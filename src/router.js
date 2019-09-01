import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Wizard from './views/Wizard.vue'
import Payment from './views/Payment.vue'
import LandingPage from './views/LandingPage.vue'
import Dashboard from './views/Dashboard.vue'
import Theme from './views/Theme.vue'


import store from './store'

Vue.use(Router)

store.dispatch('autoLogin')
store.dispatch('autoLoadSite')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  linkActiveClass: '',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/wizard',
      name: 'wizard',
      component: Wizard,
      beforeEnter(to, from, next){
        if(store.state.token) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/site/:siteId',
      name: 'site',
      component: LandingPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: Dashboard,
      beforeEnter(to, from, next){
        if(store.state.token) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/theme',
      name: 'theme',
      component: Theme,
      beforeEnter(to, from, next){
        if(store.state.token) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})