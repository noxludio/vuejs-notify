<template>
  <div class="demo">
    <div class="first-block">
      <div class="container">
        <div class="d-flex flex-column justify-content-between" style="height:80vh;">
          <div class="d-flex justify-content-between">
            <button @click="notify1('top left')" class="btn btn-primary mt-2">Notify 'top left'</button>
            <button @click="notify1('top center')" class="btn btn-primary mt-2">Notify 'top center'</button>
            <button @click="notify1('top right')" class="btn btn-primary mt-2">Notify 'top right'</button>
          </div>
          <div>
            <h2>vuejs-notify</h2>
            <div>
            <small>
              <p>Highly versitile Vue notifications plugin</p>
              <a href="https://github.com/noxludio/vuejs-notify" target="_blank" class="mr-2">Github</a>
              <a href="https://www.npmjs.com/package/vuejs-notify" target="_blank">NPM</a>
            </small>
            </div>
            <div class="p-3">
              <code>npm i vuejs-notify --save</code>
            </div>
            <div class="mt-3">
              <div>
                <small>Close notifications</small>
              </div>
              <button title='$notifyCloseAll()' class="btn btn-sm btn-outline-primary mr-2" @click='$notifyCloseAll()'>Close all</button>
              <button title='$notifyCloseAll(true)' class="btn btn-sm btn-outline-secondary" @click='$notifyCloseAll(true)'>Force close all</button>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button @click="notify1('bottom left')" class="btn btn-primary mt-2">Notify </button>
            <button @click="notify1('bottom center')" class="btn btn-primary mt-2">Notify </button>
            <button @click="notify1('bottom right')" class="btn btn-primary mt-2">Notify </button>
          </div>
        </div>
      </div>
    </div>
    <div class="demos">
      <div class="container">
        <div class="installation py-4">
          <h3 id="installation">Installation</h3>
          <div class="mt-4">
            <h6>Out of box</h6>
            <codemirror :value="codes.installation[0]"></codemirror>
          </div>
          <div class="mt-4">
            <h6>Configurations</h6>
            <codemirror :value="codes.installation[1]"></codemirror>
          </div>
        </div>
        <div class="usage py-4">
          <h3 id="usage">Usage</h3>
          <div class="mt-4">
            <h6>Use with strings</h6>
            <codemirror :value="codes.usage[0]"></codemirror>
          </div>
          <div class="my-3">
            <button class='mr-1 btn btn-sm btn-outline-primary' @click='$notify.default("My default message")'>Default</button>
            <button class='mr-1 btn btn-sm btn-outline-primary' @click='$notify.error("My error message")'>Error</button>
            <button class='mr-1 btn btn-sm btn-outline-primary' @click='$notify.warning("My warning message")'>Warning</button>
            <button class='mr-1 btn btn-sm btn-outline-primary' @click='$notify.success("My success message")'>Success</button>
            <button class='mr-1 btn btn-sm btn-outline-primary' @click='$notify.info("My info message")'>Info</button>
          </div>
          <div class="mt-4">
            <h6>Other functions</h6>
            <codemirror :value='codes.usage[1]'></codemirror>
          </div>
        </div>
        <div class="playground py-4">
          <h3 id="usage">Playground</h3>
          <p>
            <small>Select demo below, edit and hit run</small>
          </p>
          <select name="playgroundSelect" id="playgroundSelect" v-model='currentPlayground' class="form-control form-control-sm">
            <option :value="0">Using objects</option>
            <option :value="1">Set states after notified</option>
            <option :value="2">Set event</option>
            <option :value="3">Custom notifier</option>
          </select>
          <codemirror v-model='codes.playground[currentPlayground]'></codemirror>
          <div class="my-3">
            <button class='mr-1 btn btn-sm btn-outline-primary' @click='runPlayground'>Run!</button>
          </div>
        </div>
      </div>
    </div>
    <div class="credits py-5">
      <small>
        <div class="mb-2"><i class="material-icons" style="font-size:12px;">copyright</i> 2019 <a target="_blank" href="https://github.com/noxludio">noxludio</a> with MIT license</div>
        <div>Cookie icon by <a target='_blank' href="https://www.freepik.com/?__hstc=57440181.8d436ee45cc9b85e0c662eaeddf68eeb.1563388904905.1563388904905.1563388904905.1&__hssc=57440181.1.1563388904906&__hsfp=131469153" title="Freepik">Freepik</a> from <a target='_blank' href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </small>
    </div>
  </div>
</template>

<script>



export default {
  name: 'Demo',
  data(){
    return {
      currentPlayground: 0,
      codes: {
        installation: require('../assets/codes/installation.js'),
        usage: require('../assets/codes/usage.js'),
        playground: require('../assets/codes/playground.js'),
      }
    }
  },
  methods: {
    runPlayground(){
      let fn = new Function(this.codes.playground[this.currentPlayground])
      fn.apply(this)
    },
    notify1(position){

      let test = {
        position,
        msg: "To be able to close this you need to do it 'Do it'",
        timeout: 0,
        marginY: 10,
        opacity: 0.95,
        styles: {
          minWidth: null,
          maxWidth: 'calc(100% - 40px)',
          width: 250
        },
        buttons: [
          { text: "Do it" ,
            click:(notify)=>{
              notify.classes = 'success'
              notify.msg = 'Nice! Now you can close this notification'
              notify.buttons = [{
                text: "Close",
                click(){
                  notify.close(true)
                }
              }]
            }
          },
        ],
        events: {
          'before-close': [
            notify=>{
              if(notify.classes!='success') notify.preventClose=true
            }
          ]
        }
      }
      this.$notify.default(test)
      // this.$notify.default(test).then( notify => {
      //   notify.on("before-close", function(){
      //     if(this.classes != 'success') this.preventClose = true
      //   })
      // })

    }
  },
  mounted(){
    console.log(this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
button.hide-cookie-button {
  opacity: 0;
  pointer-events: none;
}
.first-block {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.demos {
  text-align: left;
  max-width: 1000px;
  margin: auto;
}

.CodeMirror {
  height: auto !important;
}

</style>
