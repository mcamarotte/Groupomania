<template>
  <div>
    <button
      v-if="count > 1 && !allCommentsDisplayed"
      @click="fetchAllComments"
      class="display-comments mb-2 pt-0 d-flex text-left">
      <span v-if="count > 2">Display {{ count - 1 }} other comments</span>
      <span v-else>Display {{ count - 1 }} another comments</span>
    </button>
    
    <div class="comment mb-2 text-left" v-for="comment in list" :key="comment">
      <Comment
        @commentDeleted="removeComment"
        :comment="comment"
        :post="post"
      />
    </div>

    <CreateComment @commentCreated="appendComment" :post="post" />
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import PostsList from '../components/PostsList'
import CreateComment from './CreateComment'
import Comment from './Comment'
export default {
  name: 'CommentsList',
  components: {
    CreateComment,
    PostsList,
    Comment
  },
  props: ['post'],
  data () {
    return {
      list: [],
      count: null,
      allCommentsDisplayed: false
    }
  },
  async mounted () {
    const res = await apiClient.get(
      `api/posts/${this.post.id}/comments/?limit=1`
    )
    this.list = res.comments.rows
    this.count = res.comments.count
  },
  methods: {
    async fetchAllComments () {
      const res = await apiClient.get(`api/posts/${this.post.id}/comments/`)
      this.list = res.comments.rows
      this.allCommentsDisplayed = true
    },
    appendComment (comment) {
      this.list.push(comment)
    },
    removeComment (commentToDelete) {
      this.list = this.list.filter(comment => comment.id !== commentToDelete.id)
    }
  },
  computed: {}
}
</script>

<style>

.comment-box {
  background-color: rgba(108, 117, 125, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 0;
}

.display-comments {
  color: #747474;
  background-color: transparent;
  border: none;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
}

.display-comments:hover {
  text-decoration: underline;
}

.display-comments:focus {
  background: none;
  outline: none;
}

</style>