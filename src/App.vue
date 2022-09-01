<template>
  <v-app>
    <v-main>
      <DateToApply />
    </v-main>
  </v-app>
</template>

<script>
import DateToApply from "./components/DateToApply";
import { auth } from "@/plugins/firebase.js";

export default {
  name: "App",

  components: {
    DateToApply,
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
