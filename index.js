import VueTouch from 'vue-touch'
import Notification from './Notification.vue'

let container = null
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
  
  if(!container) {
    return console.warn("vue-touch-notify was not installed properly. Container was not set.")
  }

  notify = typeof notify === 'string' ? { msg } : notify
  let options = Object.assign({notifications}, defaultOptions)
  const notifyComponent = new notifyConstructor({data: Object.assign(options, notify)}).$mount()
  container.appendChild(notifyComponent.$el)
  
  if(notifications.length > (defaultOptions.max||60)) {
    let overflow = notifications.pop()
    overflow.$destroy()
    if(overflow.$el) overflow.$el.remove();
  }

  return notifyComponent

  // if(defaultOptions.returnPromise) {
  // } else return notifyComponent

}

let setPreset = function(Vue, name, options) {
  presets[name] = Object.assign(presets[name]||{}, options)
  Vue.prototype.$notify[name] = function(notify){
    let defaults = Object.assign({}, defaultOptions)
    Object.assign(defaults, presets[name])
    const notifyComponent = notifier(Object.assign(defaults, typeof notify === 'string' ? {msg:notify} : notify))

    return new Promise( (resolve, reject) => {
      notifyComponent.on('mounted', resolve)
    })
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
    container = document.createElement('div')
    container.classList.add('vue-touch-notify-container')
    document.body.appendChild(container)

    Object.assign(defaultOptions, (options||{}) || {})

    notifyConstructor = Vue.extend( Notification )
    
    Vue.prototype.$notify = {}

    Vue.prototype.$notifyPreset = function(name, options){
      setPreset(Vue,name,options||{})
      return this
    }
    Vue.prototype.$getNotifyPresets = function(){
      return presets
    }

    for (const name in presets) {
      if (presets.hasOwnProperty(name)) setPreset(Vue, name)
    }
  }
}

export { notify }