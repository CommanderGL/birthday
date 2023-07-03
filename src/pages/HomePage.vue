<script lang="ts">
import '../styles/HomePage.css';
import RouterLink from '../components/RouterLink.vue';
import VueQrious from 'vue-qrious';

export default {
    data() {
        return {
            fullURL: '',
            url: '',
            qrcodeSize: 150
        }
    },
    methods: {
        async onSubmit(e: Event) {
            e.preventDefault();

            const { basePath } = await import('../router');
            
            this.url = `${basePath}/view#${(this.$refs.input as HTMLInputElement).value}`;
            this.fullURL = `${window.location.origin}${this.url}`;
        },
        copy() {
            window.navigator.clipboard.writeText(this.fullURL);
        },
        download() {
            const downloadURI = (document.querySelector('img') as HTMLImageElement).src;
            const downloadElem = document.createElement('a');
            downloadElem.download = 'birthday-qrcode.png';
            downloadElem.href = downloadURI;
            document.body.appendChild(downloadElem);
            downloadElem.click();
            document.body.removeChild(downloadElem);
        }
    },
    components: {
        RouterLink,
        VueQrious
    }
}
</script>

<template>
    <h1>Birthday Website Generator</h1>
    <form @submit="onSubmit">
        <input type="text" placeholder="Name..." ref="input" autofocus>
        <button type="submit">Generate!</button>
    </form>
    <div v-if="url != ''" class="generated">
        <RouterLink :to="url">{{ fullURL }}</RouterLink>
        <button @click="copy">Copy</button>
        <br>
        <div class="qrcode-row">
            <vue-qrious :value="fullURL" level="M" :size="qrcodeSize" />
            <button @click="download">Download</button>
        </div>
    </div>
</template>