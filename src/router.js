import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:'/home/mymusic',
      children: [
        {
          path: '/home/mymusic',
          name: 'mymusic',
          component: () => import('./components/MyMusic.vue')
        },
        {
          path: '/home/discover',
          name: 'discover',
          component: () => import('./components/Discover.vue')
        },
        {
          path: '/home/video',
          name: 'video',
          component: () => import('./components/Video.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Login.vue')
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('./views/Record.vue')
    },
    {
      path: '/pld',
      name: 'pld',
      component: () => import('./views/PlaylistDetail.vue')
    }
  ]
})
