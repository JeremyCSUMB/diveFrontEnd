import Vue from 'vue'
import VueRouter from 'vue-router'
import Video from '../views/Video.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/diveRoute/:rovName/:diveNumber',
    name: 'DiveRoute',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DiveRoute.vue')
  },
  {
    path: '/video/:rovName/:diveNumber',
    name: 'Video',
    component: Video
  },
  {
    path: '/validate/:rovName/:diveNumber',
    name: 'Validate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Validate.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
