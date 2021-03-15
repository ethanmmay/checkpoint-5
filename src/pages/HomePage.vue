<template>
  <div>
    <Blogs />
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
</style>
