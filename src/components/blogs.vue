<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div v-for="blog in state.blogs" class="col-3" :key="blog.title">
            <div class="card mt-3" @click="showBlog(blog._id)">
              <div class="card-img-top mt-5">
                <img :src="blog.creator.picture" alt="User Picture">
              </div>
              <div class="card-body">
                <h4>{{ blog.title }}</h4>
                <h6 class="text-secondary">
                  By {{ blog.creator.email }}
                </h6>
                <h6>{{ blog.body.substring(0, 60)+ '...' }}</h6>
              </div>
            </div>
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
export default {
  name: 'Blogs',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs)
    })
    onMounted(async() => {
      await blogService.getBlogs()
    })
    return {
      state,
      async showBlog(id) {
        await blogService.showBlog(id)
      }
    }
  }
}
</script>

<style scoped>
img {
    max-width: 120px;
    max-height: 120px;
    width: auto;
    height: auto;
}

.card {
    filter: drop-shadow(3px 5px 3px #33333393);
}

.card:hover {
    transform: scale(1.05);
    transition: all 0.05s ease-out;
    cursor: pointer;
}

.card-img-top {
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(3px 5px 3px #33333393)
}
</style>
