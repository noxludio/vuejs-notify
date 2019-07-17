<template>
  <div id="app">
    <demo></demo>
  </div>
</template>

<script>
import Demo from './components/Demo.vue'
import cookies from 'browser-cookies'
export default {
  name: 'app',
  components: {
    Demo
  },
  mounted(){
    if(cookies.get('cookiesAccepted') === null){
      this.$notify.cookie()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
