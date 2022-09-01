<template>
  <v-app>
    <v-main>
      <DateToApply />
    </v-main>
  </v-app>
</template>

<script>
import DateToApply from "./components/DateToApply";

export default {
  name: "App",

  components: {
    DateToApply,
  },

  data: () => ({
    //
  }),
};
</script>
