import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import animate from "animate.css";
import * as API from '@/api';
import util from '@/util'

Vue.use(animate)
Vue.use(ElementUI);


Vue.config.productionTip = false

const vue =  new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$util = util
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
