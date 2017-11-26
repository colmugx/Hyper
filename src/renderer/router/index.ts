import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-screen',
      component: require('@/views/StartScreen.vue').default
    },
    {
      path: '/main',
      component: require('@/views/MainView').default,
      children: [
        {
          path: '/',
          redirect: '/blog/posts'
        },
        {
          path: '/blog/posts',
          component: require('@/views/blog/list').default
        },
        {
          path: '/review',
          component: require('@/views/review/review').default
        },
        {
          path: '/setting',
          name: 'Settings',
          component: require('@/views/setting').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
