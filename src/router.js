import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'posts',
      component: () => import('./components/pages/Posts.vue')
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('./components/pages/Post.vue')
    }
  ]
})
