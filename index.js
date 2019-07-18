import VueTouch from 'vue-touch'
import Notification from './Notification.vue'

let container = null
let defaultOptions = {}
let notifications  = []
let notifiers = {}
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
  }
}

let notifyConstructor = function(){}
function notifier (notify){
  if(!container) {
    return console.warn("vuejs-notify was not installed properly. Container was not set.")
  }
  let options = Object.assign({notifications}, defaultOptions)
  const notifyComponent = new notifyConstructor({data: Object.assign(options, notify)}).$mount()

  // remove destroyed from notifications
  notifyComponent.on('destroyed', function(){
    notifications = notifications.filter( n => n._uid != notifyComponent._uid )
  })
  
  // remove overflow
  container.appendChild(notifyComponent.$el)
  if(notifications.length > (defaultOptions.max||60)) {
    let overflow = notifications.pop()
    overflow.$destroy()
    if(overflow.$el) overflow.$el.remove();
  }
  return notifyComponent
}

function notifySetPreset (name, options = {}) {
  presets[name] = Object.assign(presets[name]||{}, options)
  notifiers[name] = function(notify){
    let defaults = Object.assign({}, defaultOptions)
    Object.assign(defaults, presets[name])
    const notifyComponent = notifier(Object.assign(defaults, typeof notify === 'string' ? {msg:notify} : notify))
    return new Promise( (resolve, reject) => {
      notifyComponent.on('mounted', resolve)
    })
  }
  return notifiers[name]
}

function notifyCloseAll (forced){
  return new Promise( (resolve) => {
    if(notifications.length === 0) resolve(notifications)
    else {
      notifications.forEach( (notify, index) => {
        if(index == notifications.length - 1) {
          notify.on('destroyed', ()=>resolve(notifications))  
        }
        notify.close(forced)
      })
    }
  })
}

function notifyGetAll () { return notifications }
function notifyGetPreset (name) { return presets[name] }

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
    container.classList.add('vuejs-notify-container')
    document.body.appendChild(container)

    Object.assign(defaultOptions, (options||{}) || {})

    notifyConstructor = Vue.extend( Notification )
    
    Vue.prototype.$notify = notifiers
    Vue.prototype.$notifySetPreset = notifySetPreset
    Vue.prototype.$notifyGetPreset = notifyGetPreset

    for (const name in presets) {
      if (presets.hasOwnProperty(name)) notifySetPreset(name)
    }
    Vue.prototype.$notifyGetAll = notifyGetAll
    Vue.prototype.$notifyCloseAll = notifyCloseAll

  }
}

export {
  notifiers as notify,
  notifyGetAll,
  notifyCloseAll,
  notifySetPreset,
  notifyGetPresets
}