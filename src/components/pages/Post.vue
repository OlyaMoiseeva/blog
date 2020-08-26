<template>
  <div>
    <router-link class="button" to="/">Назад</router-link>
    <base-posts-list>
      <template>
        <base-post
          class="full-post"
          :prev="false"
          :num="comments.filter((i) => i.postId === post.id).length"
        >
          <template v-slot:title>{{ post.title }}</template>
          <template v-slot:desc>{{ post.description }}</template>
        </base-post>
      </template>
    </base-posts-list>
    <the-comments-list>
      <template>
        <base-comment
          v-for="comment in comments.filter(item => item.postId === this.id)"
          :key="comment.id"
          @remove="removeComment(comment.id)"
        >
          <template v-slot:name>{{ comment.name }}</template>
          <template v-slot:comment>{{ comment.comment }}</template>
        </base-comment>
      </template>
    </the-comments-list>
    <div class="posts-form">
      <input
        type="text"
        class="input"
        placeholder="Имя"
        v-model="name"
        @keyup.enter="addComment"
      >
      <input
        type="text"
        class="input"
        placeholder="Комментарий"
        v-model="comment"
        @keyup.enter="addComment"
      >
      <button class="button" @click="addComment">Добавить комментарий</button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Post',
  components: {
    BasePost: () => import('@/components/ui/BasePost.vue'),
    BaseComment: () => import('@/components/ui/BaseComment.vue'),
    TheCommentsList: () => import('@/components/ui/TheCommentsList.vue'),
    BasePostsList: () => import('@/components/ui/BasePostsList.vue')
  },
  data() {
    return {
      posts: [],
      post: Object,
      id: this.$route.params.id,
      comments: [],
      name: null,
      comment: null
    }
  },
  mounted() {
    if (localStorage.getItem('posts')) {
      try {
        this.posts = JSON.parse(localStorage.getItem('posts'))
        this.post = this.posts.find(item => item.id === this.id)

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
    addComment() {
      if (!this.name || !this.comment) {
        return;
      }
      this.comments.push({
        name: this.name,
        comment: this.comment,
        postId: this.id,
        id: uuidv4()
      })
      this.name = ''
      this.comment = ''
      this.saveComment()
    },
    removeComment(id) {
      const comment = this.comments.find((comment) => comment.id === id)
      const commentId = this.comments.indexOf(comment);
      this.comments.splice(commentId, 1)
      this.saveComment()
    },
    saveComment() {
      const parsed = JSON.stringify(this.comments)
      localStorage.setItem('comments', parsed)
    }
  }
}
</script>
