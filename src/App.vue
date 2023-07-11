<script lang="ts">
import { store } from './router';

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>
  <component :is="store.currentPage" />
</template>