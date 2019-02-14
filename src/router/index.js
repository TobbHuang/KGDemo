import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index')
    },
    {
      path: '/forceGraph',
      name: 'forceGraph',
      component: () => import('@/views/ForceGraph')
    },{
      path: '/subGraph',
      name: 'subGraph',
      component: () => import('@/views/SubGraph')
    },{
      path: '/contractUpload',
      name: 'contractUpload',
      component: () => import('@/views/contractUpload')
    }
  ]
})
