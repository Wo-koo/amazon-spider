import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from  './http'

Vue.prototype.$http = http; //将http引入Vue的原型链中，方便全局引用
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
