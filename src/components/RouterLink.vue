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
            getCurrentPage(this.to as string);
        }
    }
};
</script>

<template>
    <a :href="to" @click="onClick"><slot /></a>
</template>