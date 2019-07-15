<template>
  <div class="demo">

    <div class="container">
      <div class="d-flex flex-column justify-content-between" style="height:80vh;">
        <div class="d-flex justify-content-between">
          <button @click="notify('top left')" class="btn btn-primary mt-2">Notify</button>
          <button @click="notify('top center')" class="btn btn-primary mt-2">Notify</button>
          <button @click="notify('top right')" class="btn btn-primary mt-2">Notify</button>
        </div>
        <div class="d-flex justify-content-between">
          <button @click="notify('bottom left')" class="btn btn-primary mt-2">Notify</button>
          <button @click="notify('bottom center')" class="btn btn-primary mt-2">Notify</button>
          <button @click="notify('bottom right')" class="btn btn-primary mt-2">Notify</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Demo',
  data(){
    return {
      clicks: 0
    }
  },
  methods: {
    notify(position){
      this.clicks++

      let test = {
        position
      }

      this.$notify.myNotify(test)
      
      

      // this.$notify.default({
      //   position,
      //   title: "Title is here",
      //   msg: "This is a test message "+this.clicks,
      //   timeout: 0,
      //   buttons: [
      //     { text: "Do it" ,click:(notify)=>{notify.close()}},
      //     { text: "Cancel", click:(notify)=>{notify.close(),this.notify(position)}, customElement: "<b>STRONG</b>"}
      //   ]
      // })
    }
  },
  mounted(){
    console.log(this);
    this.$notifyPreset('myNotify', {
      classes: ["my-custom-notify"],
      msg: "Default",
      title: "Default",
      timeout: 0,
      transition: 350,
      closeOnClick: false,
      buttons: [
        { text: "OK!",
          click(notify){
            this.classes = 'warning'
            this.opacity = 1
            this.title = "Success!"
            this.buttons = [{
              text: 'Close',
              click(n) {
                n.close(true)
              }
            }]
            // setTimeout( () => {
            //   notify.close()
            // }, 1400)
          }
        }
      ]
    })
    .$notify.myNotify({marginY: window.innerHeight/2 }).then( notify => {
      notify.on('before-close', function(n){
        console.log('BEFORE CLOSE EVENT', this);
        this.preventClose = true

      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo{
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
