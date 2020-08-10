import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import http from  './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = http; //将http引入Vue的原型链中，方便全局引用
Vue.config.devtools = true;//这句话是用来启动vuedevtool调试工具的
Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
