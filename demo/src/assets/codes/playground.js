module.exports = [
`// Overwrite presets with an object
this.$notify.success({
  position: 'bottom right',
  timeout: 0,
  title: 'Success!',
  msg: 'You did something right. Swipe to close',
})`,
`// Set states after notified
this.$notify.default({
  msg: 'Hey watch as this changes in a second',
}).then( notify => {
  setTimeout(()=>{
    notify.msg = 'Hah see?'
  }, 1000)
})`,
`// Set event
this.$notify.default({
  msg: 'Cant close this',
  timeout: 0,
  events: {
    'before-close' : [
      // you can set events here
      // function(notify){notify.preventClose=true}
    ] 
  },
  buttons: [
    { text: 'except with this', click(notify){ notify.close(true) }}
  ]

}).then( notify => {
  // but lets set it here instead
  notify.on('before-close', function(notify){
    notify.preventClose = true
  })
  notify.on('destroyed', function(notify){
    alert('A must-have annoying demo alert')
  })
})`,
`// Custom notifier
let myNotifier = this.$notifySetPreset('myNotifier', {
  title: 'It has title',
  msg: 'And a message'
})

myNotifier()

// Of course this works too
this.$notify.myNotifier('Works too')
`
]