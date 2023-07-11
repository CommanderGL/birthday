<script lang="ts">
import '../styles/ViewPage.css';

export default {
    data() {
        return {
            name: "",
            confettiEnabled: true
        };
    },
    async mounted() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('no-confetti') != null) this.confettiEnabled = false;

        const name = params.get('name');

        if (name != '' && name != null) {
            this.name = name.replace("%20", " ");

            const { default: JSConfetti } = await import('js-confetti');
            const jsConfetti = new JSConfetti({
                canvas: this.$refs.canvas as HTMLCanvasElement
            });
            
            if (this.confettiEnabled) jsConfetti.addConfetti()
            setInterval(() => {
                if (this.confettiEnabled) jsConfetti.addConfetti()
            }, 1250);
        }
        
        window.addEventListener('keypress', e => {
            if (e.key == " ") {
                this.confettiEnabled = !this.confettiEnabled;
            }
        });
        window.addEventListener('click', () => {
            this.confettiEnabled = !this.confettiEnabled;
        });
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