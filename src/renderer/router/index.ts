import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-view',
      component: require('@/views/MainView')
    },
    {
      path: '/blog/articles',
      name: 'article-list',
      component: require('@/views/blog/ArticleList')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
