// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index.js";

import Home from '../views/Home.vue'
import TopicIndex from '../views/Topic/Index.vue'
import TopicShow from '../views/Topic/Show.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Learn Languages',
    },
  },
  {
    path: '/topic',
    name: 'TopicIndex',
    component: TopicIndex,
    meta: {
      title: 'Start a Topic',
      requiresAuth: true,
    },
  },
  {
    path: '/topic/:topic',
    name: 'TopicShow',
    component: TopicShow,
    meta: {
      title: 'Learning by Guessing',
      requiresAuth: true,
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const DEFAULT_TITLE = 'Konteks'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/authenticated']) {
      next()
    } else {
      next({
        name: 'Home'
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})


export default router