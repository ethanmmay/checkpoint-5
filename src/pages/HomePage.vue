<template>
  <div>
    <Blogs />
    <div v-if="blogDetails">
      <BlogDetails />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    return {
      blogDetails: computed(() => AppState.blogDetails)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
