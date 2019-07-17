<template>
  <div class="demo">
    <div class="first-block">
      <div class="container">
        <div class="d-flex flex-column justify-content-between" style="height:80vh;">
          <div class="d-flex justify-content-between">
            <button @click="notify1('top left')" class="btn btn-primary mt-2">Notify</button>
            <button @click="notify1('top center')" class="btn btn-primary mt-2">Notify</button>
            <button @click="notify1('top right')" class="btn btn-primary mt-2">Notify</button>
          </div>
          <div>
            <h2>vuejs-notify</h2>
            <code>npm i vuejs-notify --save</code>
          </div>
          <div class="d-flex justify-content-between">
            <button @click="notify1('bottom left')" class="btn btn-primary mt-2">Notify</button>
            <button @click="notify1('bottom center')" class="btn btn-primary mt-2">Notify</button>
            <button @click="notify1('bottom right')" class="btn btn-primary mt-2">Notify</button>
          </div>
        </div>
      </div>
    </div>
    <div class="demos">
      <div class="container">
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
    </div>
    <div class="credits py-5">
      <small>
        <div>Cookie icon by <a href="https://www.freepik.com/?__hstc=57440181.8d436ee45cc9b85e0c662eaeddf68eeb.1563388904905.1563388904905.1563388904905.1&__hssc=57440181.1.1563388904906&__hsfp=131469153" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </small>
    </div>
  </div>
</template>

<script>



export default {
  name: 'Demo',
  data(){
    return {
      codes: {
        installation: require('../assets/codes/installation.js')
      }
    }
  },
  methods: {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
