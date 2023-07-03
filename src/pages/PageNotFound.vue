<!-- Only Used On Dev Server (For Now) -->
<script lang="ts">
import '../styles/PageNotFound.css';

export default {
    data() {
        return {
            msg: "404 - Page Not Found!"
        }
    }
}
</script>

<template>
    <h1 class="notfound">{{ msg }}</h1>
</template>