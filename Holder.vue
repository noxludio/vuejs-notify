<template>
  <div>
    <component v-for="notify in notifications" v-bind:key="notify._uid" v-bind:is="notify"></component>
  </div>
</template>

<script>
export default {
  data(){
    console.log(this)
    return {
      notifications: []
    }
  }
}
</script>
