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
            <h2>vue-touch-notify</h2>
            <code>npm i --save vue-touch-notify</code>
          </div>
          <div class="d-flex justify-content-between">
            <button @click="notify1('bottom left')" class="btn btn-primary mt-2">Notify</button>
            <button @click="notify1('bottom center')" class="btn btn-primary mt-2">Notify</button>
            <button @click="notify1('bottom right')" class="btn btn-primary mt-2">Notify</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data(){
    return {}
  },
  methods: {
    notify1(position){

      let test = {
        position,
        msg: "To be able to close this you need to do it 'Do it'",
        timeout: 0,
        styles:{
          minWidth: 250,
          maxWidth: 250
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
        ]
      }

      this.$notify.default(test).then( notify => {
        notify.on("before-close", function(){
          if(this.classes != 'success') this.preventClose = true
        })
      })

    }
  },
  mounted(){}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.first-block {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
