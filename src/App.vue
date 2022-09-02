<template>
  <v-app>
    <v-main>
      <DateToApply v-if="userId" :userId="userId" />
      <Login v-else />
      <SnackBar :text="snackBarMessage" v-model="showSnackBar" />
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
    SnackBar
  },

  data: () => ({
    userId: null,
    snackBarMessage: "",
    showSnackBar: false
  }),
  methods: {
    showMessage(text, error = false) {
      this.snackBarMessage = text;
      this.showSnackBar = true;
    }
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
