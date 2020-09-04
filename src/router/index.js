// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

import Home from '../views/Home.vue'
import TopicIndex from '../views/Topic/Index.vue'
import TopicShow from '../views/Topic/Show.vue'
import LessonIndex from '../views/Lesson/Index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Learn Languages',
        },
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                next({
                    name: 'TopicIndex',
                })
            } else {
                next()
            }
        },
    },
    {
        path: '/topics',
        name: 'TopicIndex',
        component: TopicIndex,
        meta: {
            title: 'Start a Topic',
            requiresAuth: true,
        },
    },
    {
        path: '/topics/:id',
        name: 'TopicShow',
        component: TopicShow,
        meta: {
            title: "Topic's Lessons",
            requiresAuth: true,
        },
        props: true,
    },
    {
        path: '/lessons/:id',
        name: 'LessonIndex',
        component: LessonIndex,
        meta: {
            title: 'Learning by Guessing',
            requiresAuth: true,
        },
        props: true,
    },
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
                name: 'Home',
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
