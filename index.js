import VueTouch from 'vue-touch'
import Notification from './Notification.vue'

let defaultOptions = {}
let notifications  = []
let notifyConstructor = function(){}
let notify = function(notify){
  let isString = typeof notify === 'string'
  let msg      = isString ? notify : notify.msg

  let data = Object.assign({},isString ? { msg } : notify)
  data = Object.assign(data, defaultOptions)
  data.notifications = notifications

  const n = new notifyConstructor({data}).$mount()
  
  document.body.appendChild(n.$el)
  console.log(n)
}

export default {
  install(Vue, options) {
    Vue.use(VueTouch)
    defaultOptions = Object.assign(defaultOptions, options || {})
    notifyConstructor = Vue.extend( Notification )
    Vue.prototype.$notify = notify
  }
}

export { notify }