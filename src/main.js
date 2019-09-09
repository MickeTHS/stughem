import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

import vueSmoothScroll from 'vue2-smooth-scroll'

import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'

Vue.use(vueSmoothScroll)
Vue.config.productionTip = false
Vue.http.headers.common['Access-Control-Allow-Origin'] = true

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target) || document.getElementById('collapse').contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
