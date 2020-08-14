import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueSwal from 'vue-swal'
import HelloWorld from '@/components/HelloWorld'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Item from '@/components/Item'
import BuyItem from '@/components/BuyItem'
import Cart from '@/components/Cart'
import SuccessMail from '@/components/SuccessMail'
import FailedMail from '@/components/FailedMail'

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(VueSwal)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: Item
    },
    {
      path: '/buy',
      name: 'BuyItem',
      component: BuyItem
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/mailcheck',
      name: "SuccessMail",
      component: SuccessMail
    },
    {
      path: '/mailcheck/failed',
      name: "FailedMail",
      component: FailedMail
    }
  ]
})