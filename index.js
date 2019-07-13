import VueTouch from 'vue-touch'
import Notification from './Notification.vue'

let defaultOptions = {}
let notifications  = []

let presets = {
  default: {},
  warning: {
    classes: ['warning']
  },
  error: {
    classes: ['error']
  },
  success: {
    classes: ['success']
  },
  info: {
    classes: ['info']
  },
  
}

let notifyConstructor = function(){}
let notifier = function(notify){

  notify = typeof notify === 'string' ? { msg } : notify
  let options = Object.assign({notifications}, defaultOptions)
  const n = new notifyConstructor({data: Object.assign(options, notify)}).$mount()

  document.body.appendChild(n.$el)
  // console.log(n)
}

let setPreset = function(Vue, name, options) {
  presets[name] = Object.assign(presets[name]||{}, options)
  Vue.prototype.$notify[name] = function(notify){
    let defaults = Object.assign({}, defaultOptions)
    Object.assign(defaults, presets[name])
    notifier(Object.assign(defaults, typeof notify === 'string' ? {msg:notify} : notify))
  }
}

export default {
  install(Vue, options = {}) {
    Vue.use(VueTouch)
    
    if(options.presets){
      for (const name in options.presets) {
        if (options.presets.hasOwnProperty(name)) {
          presets[name] = Object.assign((presets[name]||{}),options.presets[name])
        }
      }
      delete options.presets
    }

    Object.assign(defaultOptions, (options||{}) || {})

    notifyConstructor = Vue.extend( Notification )
    
    Vue.prototype.$notify = {}

    Vue.prototype.$notifyPreset = function(name, options){
      setPreset(Vue,name,options||{})
      return Vue
    }

    for (const name in presets) {
      if (presets.hasOwnProperty(name)) setPreset(Vue, name)
    }
  }
}

export { notify }