import Vue from 'vue'
import App from './App.vue'

import VueNotify from '../../index'

Vue.config.productionTip = false

Vue.use(VueNotify)

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
