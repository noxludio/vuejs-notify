import Vue from 'vue'
import App from './App.vue'

import VueNotify from '../../index'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/paraiso-dark.css'
import 'codemirror/theme/base16-light.css'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/mode/javascript/javascript.js'

import cookies from 'browser-cookies'

Vue.use(VueCodemirror, {
  options: {
    line: true,
    // theme: 'paraiso-dark',
    theme: 'base16-light',
    tabSize: 2,
    lineNumbers: true,
    lineWrapping: false,
    styleActiveLine: true,
  },
})

Vue.config.productionTip = false

import CookieComponent from './components/CookieComponent'

Vue.use(VueNotify,{
  presets: {
    cookie: {
      title: 'Take my cookies',
      styles: {
        width: '100%'
      },
      component: CookieComponent,
      buttons: [
        {
          text: 'Accept & Dismiss',
          click(notify){
            cookies.set('cookiesAccepted','true', {expires:365})
            notify.close(true)
          }
        }
      ],
      events: {
        'before-close': [ notify => notify.preventClose = true ]
      }
    }
  }
})

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
