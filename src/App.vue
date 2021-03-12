<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main class="container-fluid">
      <router-view v-slot="{Component}">
        <transition name="route" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="mt-5">
      <div class="bg-dark text-light text-center p-4">
        Made with 💖 by CodeWorks
      </div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      state: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

main {
  height: auto;
}
</style>
