import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-screen',
      component: require('@/views/StartScreen')
    },
    {
      path: '/main',
      component: require('@/views/MainView'),
      children: [
        {
          path: '/',
          redirect: '/blog/posts'
        },
        {
          path: '/blog/posts',
          component: require('@/views/blog/list')
        },
        {
          path: '/review',
          component: require('@/views/review/review')
        },
        {
          path: '/setting',
          name: 'Settings',
          component: require('@/views/setting')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
