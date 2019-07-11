<template>
  <div class="demo">
    <button @click="notify" class="btn btn-primary mt-2">Notify</button>
    <button @click="notify" class="btn btn-success mt-2">Notify</button>
    <button @click="notify" class="btn btn-warning mt-2">Notify</button>
    <button @click="notify" class="btn btn-danger mt-2">Notify</button>
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
    notify(){
      this.clicks++
      this.$notify({msg:"this is test "+this.clicks, timeout:0})
    }
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
