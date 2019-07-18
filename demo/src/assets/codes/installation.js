
module.exports = [
`import Vue from 'vue'
import VueNotify from 'vuejs-notify'
Vue.use(VueNotify)`,
`// All configurations are optional
Vue.use(VueNotify, {
  max: 100, // Default 60
  timeout: 0, // In milliseconds, 0 for never. Default is 6000,
  position: 'bottom center', // 'bottom left', 'bottom right', 'top left', 'top center', 'top right',
  transition: 450, // Animation speed. Default 330
  marginY: 10, // Spacing between notifications 
  marginX: 20, // Margin on x axis. Used only on left/right alignments
  opacity: 0.95, // Default 1 
  title: 'Title', // Default null 
  msg: 'Message', // Default null
  closeOnClick: true, // Default false
  component: MyVueComponent, // Your component will be placed after message and before buttons
  componentProps: {}, // Your component props
  classes: ['my-class'], // Classes for Default preset, gets overwritten by presets
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
    // Array of functions
    // First argument is always the notification component
    'before-close': [
      function(notify) { 
        // preventClose is checked on close function and reset to false after prevented
        // it can only be used synchronoushly
        notify.preventClose = true
        // to force close use 'close(true)'
      }
    ],
    'destroyed': [], // Fired after destroyed
    'mounted': [], // Fired after mount
    'click': [] // Fired when notify is clicked. Second argument is click event
  },
  appear: { // Appear animations
    'top left':'NotifyFromLeft',
    'top right':'NotifyFromRight',
    'top center':'NotifyFromTop',
    'bottom left':'NotifyFromLeft',
    'bottom right':'NotifyFromRight',
    'bottom center':'NotifyFromBottom',
  },
  // pre-configure presets
  presets: {
    // presets use default configurations as their base
    error: { // default presets are 'error', 'warning', 'success', 'info'
      title: 'Error!',
      classes: ['my-error'] // default ['error']
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

