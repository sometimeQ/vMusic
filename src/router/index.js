import Vue from 'vue'
import VueRouter from 'vue-router'
// import { resolveAsyncComponents } from 'vue-router/src/util/resolve-components'

// 导入其他的路由组件,这样引入会有性能问题
/*
import Recommend from '../views/Recommend'
import Singer from '../views/Singer'
import Rank from '../views/Rank'
import Search from '../views/Search'
*/

// 按需加载组件，使用的时候才加载
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
const Account = (resolve) => {
  import('../views/Account').then((module) => {
    resolve(module)
  })
}


Vue.use(VueRouter)

// 配置路由
const routes = [
    {path: '/', redirect: 'recommend/'}, // 默认跳转到第一个
    { path: '/recommend',
      component: Recommend,
      // 二级路由
      children: [
        {
          // 跳转到详情界面, 传递的参数
          path: 'detail/:id/:type', // 太坑了，'/detail/:id/:type',多了一个/没有跳转过去
          component: Detail,
        }
      ],
    },
    { path: '/singer', component: Singer},
    { path: '/rank', component: Rank},
    { path: '/search', component: Search},
    { path: '/account', component: Account}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
