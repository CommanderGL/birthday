<script lang="ts">
import { getCurrentPage } from './router';

export default {
  data() {
    return {
      currentPath: window.location.pathname,
    }
  },
  computed: {
    currentPageView(): any {
      return getCurrentPage(this.currentPath);
    }
  },
  mounted() {
    const loop = () => {
      this.currentPath = window.location.pathname;
      window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
  }
}
</script>

<template>
  <component :is="currentPageView" />
</template>