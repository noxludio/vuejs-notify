
module.exports = [
`import Vue from 'vue'
import VueNotify from 'vuejs-notify'
Vue.use(VueNotify)

// Then in component
this.$notify.default('My default message') // String or Object wihth configurations
this.$notify.error('My error message')
this.$notify.warning('My warning message')
this.$notify.success('My success message')
this.$notify.info('My info message')`,
`// All configurations are optional
Vue.use(VueNotify, {
  timeout: 0, // In milliseconds, 0 for never. Default is 6000,
  position: 'bottom center', // 'bottom left', 'bottom right', 'top left', 'top center', 'top right',
  transition: 450, // Animation speed. Default 330
  marginY: 10, // spacing between notifications 
  marginX: 20, // margin on x axis. Used only on left/right alignments
  opacity: 0.95, // default 1 
  title: 'Title', // default null 
  msg: 'Message', // default null
  component: MyVueComponent, // Your component will be placed after message and before buttons
  componentProps: {}, // default null
  classes: 'my-class', // Array, object or string 
  styles: { // these are binded to vue notification
    // Number values get 'px' postfix (except opacity)
    minWidth: null, // default 250
    maxWidth: 'calc(100% - 40px)', // default 350
    width: 250 // default null
  },
  buttons: [
    {
      html: '<i class="material-icons">face</i>', // Use for icons or what ever
      text: 'Ok',
      click(notify){ notify.close(true) }, // close(true) forces close function to finish even when prevented on event
      classes: 'my-button-class' // Array, object or string
    }
  ],
  events: {
    'before-close': [
      function(notify) {
        // preventClose is checked on close function and reset to false after prevented
        // it can only be used synchronoushly
        notify.preventClose = true
        // to force close use 'close(true)'
      }
    ],
    'closed': [], // fires after successful close
    'mounted': [], // fires after mount
    'click': [] // fires when notify is clicked
  },
  appear: { // Appear animations
    'top left':'NotifyFromLeft',
    'top right':'NotifyFromRight',
    'top center':'NotifyFromTop',
    'bottom left':'NotifyFromLeft',
    'bottom right':'NotifyFromRight',
    'bottom center':'NotifyFromBottom',
  },
  presets: { // configure presets
    // presets use default configurations as their base
    error: { // default presets are 'error', 'warning', 'success', 'info'
      title: 'Error!'
    },
    cookie: { // add custom presets
      component: CookieComponent,
      buttons: [{
        text: 'Accept & Dismiss',
        click(notify){
          // ... set cookies and close
          notify.close(true) 
        }
      }],
      events: {
        'before-close': [ notify => notify.preventClose = true ]
      }
    }
  }
})`
]

