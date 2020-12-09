import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import $ from 'jquery';
import './assets/css/styles.css';
import './assets/css/bootstrap.css';

Vue.use(VueAxios, axios);

Vue.use(BootstrapVue);

Vue.use($);

Vue.config.productionTip = false

//Default vue's http modules for api calls
//Vue.prototype.$http = axios;
//Load token from localStorage
const token = localStorage.getItem("token");
//If token then append default axios authorization headers
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//Yeah this is kind of a disaster.
//Was adding and commenting out stuff until other stuff worked right...