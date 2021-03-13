<template>
  <div class="row">
    <div class="col-12">
      <div class="card mt-3" @click="showBlog(blog.id)" v-if="state.blog && state.blog.creator">
        <img :src="state.blog.creator.picture" alt="User Picture">
        <div class="card-body">
          <h4>{{ state.blog.title }}</h4>
          <h6 class="text-secondary">
            By {{ state.blog.creator.email }}
          </h6>
          <h6>{{ state.blog.body }}</h6>
          <h6>{{ state.comments }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, onMounted, reactive } from 'vue'
import { blogService } from '../services/BlogsService'
// import { commentService } from '../services/CommentsService'
export default {
  name: 'BlogDetails',
  setup() {
    onMounted(async() => {
      blogService.getBlogs()
    })
    const state = reactive({
      blog: computed(() => AppState.blogDetails),
      comments: computed(() => AppState.comments)
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
</style>
