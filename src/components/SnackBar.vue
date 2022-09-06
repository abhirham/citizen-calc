<template>
    <v-snackbar :color="color" v-model="snackbar" :timeout="3000">
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
                dismiss
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: "SnackBar",
    props: {
        value: { required: true, type: Boolean },
        error: { default: false, type: Boolean },
        text: { required: true, type: String },
    },
    computed: {
        color() {
            return this.error ? "error" : "success";
        },
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
