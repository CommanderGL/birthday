<script lang="ts">
import { getCurrentPage } from '../router';

export default {
    props: {
        to: String
    },
    methods: {
        onClick(e: Event) {
            e.preventDefault();
            window.history.pushState(this.to, this.to as string, this.to);
            const parser = document.createElement('a');
            parser.href = this.to as string;
            getCurrentPage(parser.pathname);
        }
    }
};
</script>

<template>
    <a :href="to" @click="onClick"><slot /></a>
</template>