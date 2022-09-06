<template>
    <v-container class="pt-10 mt-10">
        <v-row justify="end"
            ><v-btn color="primary" @click="saveToDb" :loading="isSavingData"
                >save</v-btn
            ></v-row
        >
        <v-row justify="center"
            >You can apply for citizenship on: {{ citizenshipApplyDate }}</v-row
        >
        <v-row justify="center">
            <v-col cols="12" sm="6">
                <DatePicker
                    :loading="isfetchingData"
                    label="When did you get your work permit"
                    disableFuture
                    v-model="work_permit_date"
                    :key="work_permit_date"
                    :disabled="isSavingData"
                />
            </v-col>
            <v-col cols="12" sm="6">
                <DatePicker
                    :loading="isfetchingData"
                    label="When did you get your perminent residency"
                    disableFuture
                    v-model="permanent_resident_date"
                    :key="permanent_resident_date"
                    :disabled="isSavingData"
                />
            </v-col>
        </v-row>
        <div>
            <h3>Days outside Canada</h3>
            <div class="mb-3">
                <v-btn
                    color="primary"
                    @click="addDayOutside"
                    :disabled="isSavingData || isfetchingData"
                    >Add new</v-btn
                >
            </div>
            <v-row align="center" v-if="isfetchingData" justify="center">
                <v-progress-circular indeterminate color="primary" />
            </v-row>
            <v-list v-else class="daysOutList">
                <template v-for="(day, idx) in daysOutSide">
                    <v-divider v-if="idx > 0" :key="idx + 'div'" />
                    <v-list-item :key="day.timestamp">
                        <v-list-item-content>
                            <v-row>
                                <v-col sm="4" cols="12"
                                    ><v-text-field
                                        outlined
                                        dense
                                        hide-details="auto"
                                        label="Description"
                                        v-model="day.description"
                                        :disabled="isSavingData"
                                /></v-col>
                                <v-col sm="4" cols="12"
                                    ><DatePicker
                                        label="From"
                                        disableFuture
                                        v-model="day.from"
                                        :disabled="isSavingData"
                                /></v-col>
                                <v-col sm="4" cols="12"
                                    ><DatePicker
                                        label="To"
                                        disableFuture
                                        v-model="day.to"
                                        :minDate="day.from || undefined"
                                        :disabled="isSavingData"
                                /></v-col>
                            </v-row>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn
                                icon
                                @click="removeDayOutside(day.timestamp)"
                                :disabled="isSavingData"
                                ><v-icon color="error"
                                    >mdi-delete</v-icon
                                ></v-btn
                            >
                        </v-list-item-action>
                    </v-list-item>
                </template>
            </v-list>
        </div>
    </v-container>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import { db } from "@/plugins/firebase.js";
import moment from "moment";

function addDayOutside() {
    return JSON.parse(
        JSON.stringify({
            description: "",
            from: null,
            to: null,
            timestamp: Date.now(),
        })
    );
}

export default {
    name: "DateToApply",
    components: { DatePicker },
    props: {
        userId: { reqired: true, type: String },
    },
    computed: {
        citizenshipApplyDate() {
            let daysRequired = 1095;

            if (!this.work_permit_date || !this.permanent_resident_date)
                return "NA";
            let wpDate = moment(this.work_permit_date);
            let prDate = moment(this.permanent_resident_date);

            let wpDays = prDate.diff(wpDate, "d") / 2;

            if (wpDays > 365) wpDays = 365;

            let daysToAdd = daysRequired - wpDays;

            this.daysOutSide
                .filter((x) => x.from && x.to)
                .forEach((x) => {
                    daysToAdd += moment(x.to).diff(x.from, "d");
                });

            return prDate.add(daysToAdd, "d").format("D MMM, YYYY");
        },
    },
    data: () => ({
        work_permit_date: null,
        permanent_resident_date: null,
        daysOutSide: [],
        isSavingData: false,
        isfetchingData: false,
    }),
    methods: {
        addDayOutside() {
            this.daysOutSide = [addDayOutside(), ...this.daysOutSide];
        },
        removeDayOutside(timestamp) {
            this.daysOutSide = this.daysOutSide.filter(
                (x, i) => x.timestamp !== timestamp
            );
        },
        saveToDb() {
            this.isSavingData = true;
            db.collection("citizen_dates")
                .doc(this.userId)
                .set({
                    work_permit_date: this.work_permit_date,
                    permanent_resident_date: this.permanent_resident_date,
                    daysOutSide: this.daysOutSide,
                })
                .then((res) => {
                    this.$emit("showMessage", { text: "Saved." });
                })
                .catch((e) => {
                    console.error(e);
                    this.$emit("showMessage", {
                        text: "Unable to save data. Please try again.",
                        error: true,
                    });
                })
                .finally(() => (this.isSavingData = false));
        },
    },
    mounted() {
        this.isfetchingData = true;
        db.collection("citizen_dates")
            .doc(this.userId)
            .get()
            .then((res) => {
                if (res.exists) {
                    let {
                        work_permit_date,
                        permanent_resident_date,
                        daysOutSide,
                    } = res.data();

                    this.work_permit_date = work_permit_date;
                    this.permanent_resident_date = permanent_resident_date;
                    this.daysOutSide = [...daysOutSide];
                }
            })
            .catch((e) => {
                console.error(e);
                this.$emit("showMessage", {
                    text: "Unable to fetch your data. Please try again.",
                    error: true,
                });
            })
            .finally(() => (this.isfetchingData = false));
    },
};
</script>

<style scoped>
.daysOutList {
    max-height: calc(100vh - 400px);
    overflow: auto;
}
</style>
