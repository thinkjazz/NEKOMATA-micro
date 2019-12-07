<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      console.log(fbError)
    }
  }
}
</script>
c
