<template>
  <div id="app">
    <div class="container">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: $text-color;
  min-height: 100vh;
  background: $color-background;
  font-size: $base-fs;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
