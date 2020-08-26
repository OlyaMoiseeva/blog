<template>
  <div class="comment">
    <div>
      <div class="comment__wrap">
        <div class="comment__label">Имя:</div>
        <slot name="name"></slot>
      </div>
      <div class="comment__wrap">
        <div class="comment__label">Текст:</div>
        <slot name="comment"></slot>
      </div>
    </div>
    <div>
      <button class="button" @click="removeItem">x</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseComment',
  methods: {
    removeItem() {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid $color-primary;
  background: $color-white;
  margin-bottom: 15px;
  padding: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}

.comment__wrap {
  display: flex;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.comment__label {
  width: 70px;
}
</style>
