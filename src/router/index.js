import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from  "./../views/Search.vue"
import GoodsInfoList from "./../views/GoodsInfoList.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/GoodsInfoList',
    name: 'GoodsInfoList',
    component: GoodsInfoList,
  },
  {
    path: '/Search',
    name: "Search",
    component: Search,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
