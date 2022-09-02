<template>
  <v-app>
    <v-main>
      <DateToApply v-if="userId" :userId="userId" />
      <Login v-else />
    </v-main>
  </v-app>
</template>

<script>
import DateToApply from "./components/DateToApply";
import Login from "./components/Login.vue";
import { auth } from "@/plugins/firebase.js";

export default {
  name: "App",

  components: {
    DateToApply,
    Login
  },

  data: () => ({
    userId: null,
  }),
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
