<template>
  <div class="col-12">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card mt-3" v-if="state.blog">
          <div class="card-img-top mt-5">
            <img :src="state.blog.creator.picture" alt="User Picture">
          </div>
          <div class="card-body">
            <h4>{{ state.blog.title }}</h4>
            <h6>
              By <span class="text-secondary">{{ state.blog.creator.email.substring(0, state.blog.creator.email.indexOf('@')) }}</span>
            </h6>
            <h6>{{ state.blog.body }}</h6><br>
            <div class="d-flex justify-content-between">
              <h5>Comments: </h5>
              <i class="fa fa-comment fa-2x text-dark" aria-hidden="true" @click="addComment(state.blog.id)"></i>
            </div>
            <h6 v-for="comment in state.comments" :key="comment.body" class="d-flex justify-content-between">
              {{ comment.creator.name.substring(0, comment.creator.name.indexOf('@')) + ': ' + comment.body }}
              <div class="d-inline-flex">
                <i class="fa fa-pencil text-info mr-2" aria-hidden="true" v-show="comment.creator.name === state.currentUser" @click="editComment(comment)"></i>
                <i class="fa fa-minus-circle text-danger" aria-hidden="true" v-show="comment.creator.name === state.currentUser" @click="deleteComment(comment.id)"></i>
              </div>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, onMounted, reactive } from 'vue'
import { blogService } from '../services/BlogsService'
import { commentService } from '../services/CommentsService'
export default {
  name: 'BlogDetails',
  setup() {
    onMounted(async() => {
      blogService.checkBlogDetails()
    })
    const state = reactive({
      blog: computed(() => AppState.blogDetails),
      comments: computed(() => AppState.comments),
      currentUser: computed(() => AppState.user.name)
    })
    return {
      state,
      deleteComment(commentId) {
        commentService.deleteComment(commentId)
      },
      editComment(comment) {
        commentService.editComment(comment)
      },
      addComment(blogId) {
        commentService.addComment(blogId)
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
}

.card {
  min-width: 400px;
    filter: drop-shadow(3px 5px 3px #33333393);
}

.fa {
  cursor: pointer;
}

.card-img-top {
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(3px 5px 3px #33333393)
}

.fa-comment {
  margin-top: -5px;
}

.fa-comment:hover {
  transform: scale(1.15);
  transition: all 0.05s ease-out;
}
</style>
