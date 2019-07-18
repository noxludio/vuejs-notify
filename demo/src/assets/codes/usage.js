module.exports = [
`// Use string, replaces msg
this.$notify.default('My default message')
this.$notify.error('My error message')
this.$notify.warning('My warning message')
this.$notify.success('My success message')
this.$notify.info('My info message')

// Or add options
this.$notify.default({position: 'bottom right', msg:'My default message'})

// Custom presets work exactly the same
this.$notify.myCustomPreset('My custom preset message')
this.$notify['im-being-fancy']('My fancy message')

// Use elsewhere
import { notify } from 'vuejs-notify'
notify.default('Yayy')`,

`// Other functions
this.$notifyGetAll() // returns array of all notifications
this.$notifyCloseAll() // close all
this.$notifyCloseAll(true) // force close all
this.$notifySetPreset('myPreset', { timeout: 10000 } ) // add or overwrite preset configuration
this.$notifyGetPreset('myPreset') // get preset configuration object

// Also available as imports
import { notify, notifyGetAll, notifyCloseAll, notifySetPreset, notifyGetPresets } from 'vuejs-notify'

// notifySetPreset returns the notifier function
let myNotifier = notifySetPreset('myPresetAgain', { classes: ['im-boring'] } ) 
myNotifier('Yay')`

]