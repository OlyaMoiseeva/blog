<template>
  <div class="posts-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BasePostsList'
}
</script>

<style lang="scss" scoped>
.posts-list {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
</style>
