<template>
  <v-form class="mt-5" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="teams[getUser.role]"
      label="Ekip"
      readonly
      required
    ></v-text-field>
    <v-text-field
      v-model="title"
      counter
      :rules="titleRules"
      label="Ödev Başlığı"
      required
    ></v-text-field>
    <v-row>
      <v-col cols="12" sm="">
        <v-text-field
          v-model="score"
          append-icon="mdi-star"
          :rules="scoreRules"
          label="Ödev Puanı"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-dialog
          ref="startDialog"
          v-model="startModal"
          :return-value.sync="startDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDate"
              label="Başlangıç Tarihi"
              hint="Bugüne gitmek için takvim ikonuna tıklayın"
              persistent-hint
              append-icon="mdi-calendar-today"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:append="startDate = defaultDate"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            scrollable
            :show-current="true"
            locale="tr-tr"
            :allowed-dates="allowedStartDates"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startModal = false">
              İptal
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.startDialog.save(startDate)"
            >
              Tamam
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col cols="12" sm="4">
        <v-dialog
          ref="endDialog"
          v-model="endModal"
          :return-value.sync="endDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endDate"
              label="Bitiş Tarihi"
              hint="Başlangıç tarihine gitmek için takvim ikonuna tıklayın"
              persistent-hint
              append-icon="mdi-calendar-today"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:append="endDate = startDate"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            scrollable
            :show-current="true"
            locale="tr-tr"
            :allowed-dates="allowedEndDates"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endModal = false">
              İptal
            </v-btn>
            <v-btn text color="primary" @click="$refs.endDialog.save(endDate)">
              Tamam
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-btn :disabled="!valid" color="success" class="mt-4" @click="validate">
        Oluştur
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import teamConfig from "@/firebase/teamConfig";
const { teams } = teamConfig;
export default {
  name: "AddHomeworkForm",
  computed: {
    ...mapGetters("auth", ["getUser"]),
    defaultDate() {
      const date = new Date();
      const dates = date.toLocaleDateString().split("/").reverse();
      if (parseInt(dates[1]) < 10) {
        dates[1] = "0" + dates[1];
      }

      return dates.join("-");
    },
  },
  data() {
    return {
      valid: true,
      title: "",
      titleRules: [(v) => !!v || "Ödev Başlığı zorunludur"],
      score: 5,
      scoreRules: [
        (v) => !!v || "Ödev Puanı zorunludur",
        (v) => Number.isInteger(Number(v)) || "Ödev Puanı tam sayı olmalıdır",
        (v) =>
          (Number(v) > 0 && Number(v) <= 100) ||
          "Ödev Puanı 0 ile 100 arasında olmalıdır",
      ],
      teams: teams,
      checkbox: false,
      startModal: false,
      endModal: false,
      startDate: null,
      endDate: null,
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    allowedStartDates(date) {
      return this.isDateBiggerOrEqual(date, this.defaultDate);
    },
    allowedEndDates(date) {
      return this.isDateBiggerOrEqual(date, this.startDate);
    },

    isDateBiggerOrEqual(first, second) {
      const firstDate = new Date(first).getTime();
      const secondDate = new Date(second).getTime();

      return firstDate >= secondDate;
    },
  },
  watch: {
    startDate: function (newDate) {
      if (this.isDateBiggerOrEqual(newDate, this.endDate)) {
        this.endDate = newDate;
      }
    },
  },

  mounted() {
    this.startDate = this.endDate = this.defaultDate;
    this.title = `Yeni ${this.teams[this.getUser.role]} Ödevi`;
  },
};
</script>

<style>
</style>