<template>
    <div id="firebaseui-auth-container"></div>
</template>

<script>
import { start_auth } from "@/plugins/firebase.js";
import "firebaseui/dist/firebaseui.css";

export default {
    name: "Login",
    mounted() {
        start_auth();
    },
};
</script>
