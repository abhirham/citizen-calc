<template>
    <div>
        you are being logged in.
    </div>
</template>

<script>
import { auth } from "@/plugins/firebase.js";

export default {
    name: 'Login',
    mounted() {
        auth.signInAnonymously();
    }
}
</script>