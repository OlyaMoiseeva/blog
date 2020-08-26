<template>
<div
  class="modal-wrap"
>
  <div
    class="modal"
    v-click-outside="closeItem"
  >
    <input
      type="text"
      class="input"
      placeholder="Заглавие"
      v-model="title"
      @keyup.enter="editItem"
    >
    <input
      type="text"
      class="input"
      placeholder="Краткое описание"
      v-model="shortDesc"
      @keyup.enter="editItem"
    >
    <textarea
      type="text"
      class="input"
      placeholder="Полное описание"
      v-model="desc"
      @keyup.enter="editItem"
    >
    </textarea>
    <button
      class="button"
      @click="editItem"
    >
      Редактировать пост
    </button>
  </div>
</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  data() {
    return{
      title: this.post.title,
      shortDesc: this.post.shortDescription,
      desc: this.post.description,
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeItem() {
      this.$emit('close')
    },
    editItem() {
      this.$emit('edit', this.title, this.shortDesc, this.desc)
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: $color-overlay;
}

.modal {
  position: absolute;
  background: $color-white;
  display: flex;
  flex-direction: column;
  width: 300px;
  left: calc(50% - 150px);
  top: calc(50% - 150px);
  padding: 20px;
  z-index: 2;
}
</style>