<template>
<div class="d-flex p-3 align-items-center">
  <img src="/cookie.svg" alt="" class="cookie">
  <small class="px-3">{{msg}}</small>
</div>
</template>
<script>
export default {
  props: ['msg']
}
</script>

<style scoped>
.cookie {
  height: 30px
}
</style>