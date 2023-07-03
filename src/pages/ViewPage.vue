<script lang="ts">
import '../styles/ViewPage.css';

export default {
    data() {
        return {
            name: ""
        };
    },
    async mounted() {
        if (window.location.hash != '') {
            this.name = window.location.hash.replace("%20", " ").substring(1);

            const { default: JSConfetti } = await import('js-confetti');
            const jsConfetti = new JSConfetti({
                canvas: this.$refs.canvas as HTMLCanvasElement
            });
            jsConfetti.addConfetti()
            setInterval(() => jsConfetti.addConfetti(), 1250);
        }   
    }
};
</script>

<template>
  <div class="ViewPage">
    <h1 v-if="name !== ''">Happy Birthday {{ name }}!</h1>
    <h1 v-else class="error">Must Specify Name!</h1>
    <canvas ref="canvas"></canvas>
  </div>
</template>