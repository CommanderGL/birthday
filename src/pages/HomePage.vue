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
        async onChangeOptions(e: Event) {
            e.preventDefault();

            const { basePath } = await import('../router');
            
            this.url = `${basePath}/view?${(this.$refs.noConfetti as HTMLInputElement).checked ? 'no-confetti&' : ''}name=${(this.$refs.input as HTMLInputElement).value}`;
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
        },
        async print() {
            const downloadURI = (document.querySelector('img') as HTMLImageElement).src;
            const { default: printJS } = await import('print-js');

            printJS(downloadURI, "image");
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
    <form @submit="onChangeOptions">
        <input type="text" placeholder="Name..." ref="input" autofocus>
        <button type="submit">Generate!</button>
        <br>
        <input type="checkbox" id="no-confetti" ref="noConfetti" @change="onChangeOptions">
        <label for="no-confetti">No Confetti (By Default)</label>
    </form>
    <div v-if="url != ''" class="generated">
        <RouterLink :to="url">{{ fullURL }}</RouterLink>
        <button @click="copy">Copy</button>
        <div class="qrcode-row">
            <vue-qrious :value="fullURL" level="M" :size="qrcodeSize" @click="download" />
            <button @click="download">Download</button>
            <button @click="print">Print</button>
        </div>
        <div class="preview">
            <h1>Preview:</h1>
            <iframe :src="url" width="500" height="300"></iframe>
        </div>
    </div>
</template>