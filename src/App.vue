<template>
    <v-app>
        <v-main>
            <Login v-if="userId === null" />
            <DateToApply @showMessage="showMessage" v-else :userId="userId" />
            <SnackBar
                :text="snackBarMessage"
                v-model="showSnackBar"
                :error="showSnackBarError"
            />
        </v-main>
    </v-app>
</template>

<script>
import DateToApply from "./components/DateToApply";
import Login from "./components/Login.vue";
import SnackBar from "./components/SnackBar.vue";
import { auth } from "@/plugins/firebase.js";

export default {
    name: "App",

    components: {
        DateToApply,
        Login,
        SnackBar,
    },

    data: () => ({
        userId: null,
        snackBarMessage: "",
        showSnackBar: false,
        showSnackBarError: false,
    }),
    methods: {
        showMessage({ text, error = false }) {
            this.snackBarMessage = text;
            this.showSnackBar = true;
            this.showSnackBarError = error;
        },
    },
    beforeCreate() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.userId = user.uid;
            } else {
                this.userId = null;
            }
        });
    },
};
</script>
