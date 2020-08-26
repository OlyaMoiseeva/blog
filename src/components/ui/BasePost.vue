<template>
  <a
    href="#"
    class="post"
    @click.prevent="openItem"
  >
    <div class="post__content">
      <div class="post__title">
        <slot name="title"></slot>
      </div>
      <div
        class="post__short-desc"
        v-if="prev"
      >
        <slot name="shortDesc"></slot>
      </div>
      <div
        class="post__desc"
        v-if="!prev"
      >
        <slot name="desc"></slot>
      </div>
    </div>
    <div class="post__footer">
      <div class="post__comments">
        <div class="post__comment-text">Комментарии:</div>
        <div class="post__comment-num">{{ num }}</div>
      </div>
      <div
        class="post__buttons"
        v-if="prev"
      >
        <button
          class="button post__button_edit"
          @click.stop="editItem"
        >
          Редактировать
        </button>
        <button
          class="button"
          @click.stop="removeItem"
        >
          x
        </button>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'BasePost',
  props: {
    prev: {
      type: Boolean,
      required: true
    },
    num: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeItem() {
      this.$emit('remove')
    },
    editItem() {
      this.$emit('edit')
    },
    openItem() {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  border: 2px solid $color-primary;
  background: $color-white;
  margin-bottom: 25px;
  padding: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}

.full-post {
  cursor: default;
}

.post__title {
  font-size: $card-title-fs;
  color: $color-primary;
  margin-bottom: 15px;
}

.post__short-desc {
  margin-bottom: 70px;
  color: $text-color;
}

.post__comments {
  color: $text-color;
}

.post__desc {
  color: $text-color;
  margin-bottom: 70px;
}

.post__comments {
  display: flex;
  align-items: center;
}

.post__comment-text {
  margin-right: 10px;
}

.post__comment-num {
  font-size: $nums-fs;
  background: $color-primary;
  color: $color-white;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
}

.post__footer {
  width: 100%;
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-content: space-between;
}

.post__button_edit {
  margin-right: 10px;
}
</style>
