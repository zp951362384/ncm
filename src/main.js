import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import VueCookies from 'vue-cookies'
import VueTouch from 'vue-touch'
import globalMethods from './plugins/globalMethods'

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(globalMethods);
Vue.use(VueTouch, {name: 'v-touch'});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
