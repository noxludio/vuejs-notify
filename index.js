import Holder from './Holder.vue'
import Notification from './Notification.vue'

let holder = {}
let notifyConstructor = function(){}
let notify = function(notify){
  let isString = typeof notify === 'string'
  let msg      = isString ? notify : notify.msg
  let data     = isString ? { msg } : notify
  const n = new notifyConstructor({data}).$mount()
  holder.notifications.push(n)
}

export default {
  install(Vue, options) {
    options = options || {}
    const holderConstructor = Vue.extend( Holder )
    holder = new holderConstructor({
      data: options
    }).$mount()
    document.body.appendChild(holder.$el)
    notifyConstructor = Vue.extend( Notification )
    Vue.prototype.$notify = notify
  }
}

export { notify as Notify }