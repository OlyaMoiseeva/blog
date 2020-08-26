<template>
  <div id="app">
    <div class="container">
      <base-posts-list>
        <template>
          <BasePost
            v-for="post in posts"
            :key="post.id"
            @remove="removePost(post.id)"
            @edit="openEditForm(post.id)"
            @open="openPost(post.id)"
            :prev="true"
            :num="comments.filter((i) => i.postId === post.id).length"
          >
            <template v-slot:title>{{ post.title }}</template>
            <template v-slot:shortDesc>{{ post.shortDescription }}</template>
          </BasePost>
        </template>
      </base-posts-list>
      <div class="posts-form">
        <input
          type="text"
          class="input"
          placeholder="Заглавие"
          v-model="blogTitle"
          @keyup.enter="addPost"
        >
        <input
          type="text"
          class="input"
          placeholder="Краткое описание"
          v-model="blogShortDescription"
          @keyup.enter="addPost"
        >
        <textarea
          class="input"
          placeholder="Полное описание"
          v-model="blogDescription"
          @keyup.enter="addPost"
        >
        </textarea>
        <button class="button" @click="addPost">Добавить пост</button>
      </div>
      <BaseEditForm
        v-if="editing"
        @close="closeEditForm"
        @edit="editPost"
        :post="editingPost"
      >
      </BaseEditForm>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'posts',
  components: {
    BasePost: () => import('@/components/ui/BasePost.vue'),
    BaseEditForm: () => import('@/components/data/BaseEditForm.vue'),
    BasePostsList: () => import('@/components/ui/BasePostsList.vue')
  },
  data() {
    return {
      posts: [],
      blogTitle: null,
      blogShortDescription: null,
      blogDescription: null,
      editing: false,
      editingPost: null,
      comments: []
    }
  },
  mounted() {
    if (localStorage.getItem('posts')) {
      try {
        this.posts = JSON.parse(localStorage.getItem('posts'))
      } catch(e) {
        localStorage.removeItem('posts')
      }
    }
    if (localStorage.getItem('comments')) {
      try {
        this.comments = JSON.parse(localStorage.getItem('comments'))
      } catch(e) {
        localStorage.removeItem('comments')
      }
    }
  },
  methods: {
    addPost() {
      if (!this.blogTitle || !this.blogShortDescription || !this.blogDescription) {
        console.log(this.posts)
        return;
      }
      this.posts.push({
        title: this.blogTitle,
        shortDescription: this.blogShortDescription,
        description: this.blogDescription,
        id: uuidv4()
      })
      this.blogTitle = ''
      this.blogShortDescription = ''
      this.blogDescription = ''
      this.savePosts()
    },
    removePost(id) {
      const post = this.posts.find((post) => post.id === id)
      const postId = this.posts.indexOf(post);
      this.posts.splice(postId, 1)
      this.savePosts()
    },
    openEditForm(id) {
      this.editing = true
      this.editingPost = this.posts.find((post) => post.id === id)
    },
    editPost(a, b, c) {
      if (a) {
        this.editingPost.title = a
      }
      if (b) {
        this.editingPost.shortDescription = b
      }
      if (c) {
        this.editingPost.description = c
      }
      this.savePosts()
      this.editing = false
    },
    closeEditForm() {
      this.editing = false
    },
    openPost(id) {
      this.$router.push({path: `/post/${id}`, params: {id: id}})
    },
    savePosts() {
      const parsed = JSON.stringify(this.posts)
      localStorage.setItem('posts', parsed)
    }
  }
}
</script>
