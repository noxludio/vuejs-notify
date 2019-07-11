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

      this.$notify.warning({
        timeout: 0,
        msg: "lasts forever"
      })
      this.$notify.error({
        timeout: 0,
        msg: "lasts forever"
      })
      this.$notify.success({
        timeout: 0,
        msg: "lasts forever"
      })
      this.$notify.info({
        timeout: 0,
        msg: "lasts forever"
      })

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
