import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex';
import store from "./vuex/store";
import global_power from './components/Global'



import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.GLOBAL = global_power
Vue.prototype.$http=axios //设置异步请求方式
Vue.config.productionTip = false
Vue.config.productionTip=false;
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Vue.use(ElementUI);
Vue.use(Vuex);
global.jQuery = require('jquery');


new Vue({
  el:'#app',
  router,
  store,
  components:{App},
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
