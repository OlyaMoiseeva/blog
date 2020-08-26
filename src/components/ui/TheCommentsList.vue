<template>
  <div class="comments-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TheCommentsList'
}
</script>

<style lang="scss" scoped>
.comments-list {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
</style>
