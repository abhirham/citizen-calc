<template>
    <v-snackbar v-model="snackbar" :timeout="3000">
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: "SnackBar",
    props: {
      value: { required: true, type: Boolean },
      text: { required: true, type: String },
    },
    computed: {
        snackbar: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
    },
};
</script>
