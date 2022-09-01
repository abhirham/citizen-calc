<template>
  <v-container class="pt-10 mt-10">
    <v-row justify="center">You can apply for citizenship on: {{citizenshipApplyDate}}</v-row>
    <v-row justify="center">
      <v-col cols="4">
        <DatePicker label="When did you get your work permit" disableFuture v-model="work_permit_date" />
      </v-col>
      <v-col cols="4">
        <DatePicker label="When did you get your perminent residency" disableFuture v-model="permanent_resident_date" />
      </v-col>
    </v-row>
    <div>
      <h3>Days outside Canada</h3>
      <v-row v-for="(day, idx) in daysOutSide" :key="idx">
        <v-col cols="4"><v-text-field outlined dense hide-details="auto" label="Description" v-model="day.description" /></v-col>
        <v-col cols="3"><DatePicker label="From" disableFuture v-model="day.from" /></v-col>
        <v-col cols="3"><DatePicker label="To" disableFuture v-model="day.to" :minDate="day.from || undefined" /></v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import moment from 'moment';
export default {
  name: "DateToApply",
  components: { DatePicker },
  computed: {
    citizenshipApplyDate() {
      let daysRequired = 1095;

      if(!this.work_permit_date || !this.permanent_resident_date) return 'NA';
      let wpDate = moment(this.work_permit_date);
      let prDate = moment(this.permanent_resident_date);

      let wpDays = prDate.diff(wpDate, 'd') / 2;

      if(wpDays > 365) wpDays = 365;
      
      let daysToAdd = daysRequired - wpDays;

      this.daysOutSide.filter(x => x.from && x.to).forEach(x => {
        daysToAdd += moment(x.to).diff(x.from, 'd')
      })

      return prDate.add(daysToAdd, 'd').format("D MMM, YYYY");

    }
  },
  data: () => ({
    work_permit_date: "2019-04-10",
    permanent_resident_date: "2021-03-01",
    daysOutSide: [
      {
        description: "",
        from: null,
        to: null
      }
    ]
  }),
};
</script>