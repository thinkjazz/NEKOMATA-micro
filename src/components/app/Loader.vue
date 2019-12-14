<template>
<div class="app-loader">
  <div class="preloader-wrapper big active">
    <div class="spinner-layer" :class="color">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    color () {
      let colors = ['spinner-yellow-only', 'spinner-yellow-only', 'spinner-green-only']
      return colors[Math.floor(Math.random() * 3)]
    }
  }
}
</script>
