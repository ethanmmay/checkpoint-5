<template>
  <div>
    <div class="row">
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'BlogDetails',
  setup() {
    const state = reactive({
      blogDetails: computed(() => AppState.blogDetails)
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
</style>
