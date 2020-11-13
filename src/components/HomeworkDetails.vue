<template>
  <div>
    <attend-homework-dialog
      :dialog="attendDialog"
      v-on:closeDialog="attendDialog = false"
    />
    <v-sheet
      v-if="getHomework"
      class="mt-10 py-6 px-6 px-sm-8 px-md-10"
      color="white"
      elevation="3"
      width="100%"
      rounded
    >
      <div class="d-flex align-center">
        <v-img :src="getImage" max-width="32" class="mr-3"></v-img>
        <h2 style class="google-sans-regular">
          {{ getHomework.title }}
        </h2>
      </div>
      <div class="d-flex align-center">
        <h3 class="google-sans-regular font-weight-regular">
          -{{ getHomework.shortDesc }}
        </h3>
      </div>
      <div class="d-flex align-center mt-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              v-on="on"
              v-bind="attrs"
              color="#0F9D58"
              dark
              style="font-size: 0.8em"
              class="pa-4 mr-1 mr-sm-2"
            >
              <v-icon small left>mdi-calendar</v-icon>
              {{ formattedDate(getHomework.startDate) }}
            </v-chip>
          </template>
          Başlangıç tarihi: {{ formattedDate(getHomework.startDate) }}
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              v-on="on"
              v-bind="attrs"
              color="#EA4335"
              style="font-size: 0.8em"
              dark
              class="pa-4 mr-1 mr-sm-2"
            >
              <v-icon small left>mdi-calendar</v-icon>
              {{ formattedDate(getHomework.endDate) }}
            </v-chip>
          </template>
          Bitiş tarihi: {{ formattedDate(getHomework.endDate) }}
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              v-on="on"
              v-bind="attrs"
              :color="getColor2"
              dark
              class="pa-4 mr-1 mr-sm-2"
              style="font-size: 0.8em"
            >
              <v-icon small left>mdi-star</v-icon>
              {{ getHomework.score }}
            </v-chip>
          </template>
          Ödev Puanı: {{ getHomework.score }}
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              color="info"
              elevation="0"
              x-small
              fab
              dark
              @click="attendDialog = true"
            >
              <v-icon>mdi-upload</v-icon>
            </v-btn>
          </template>
          Ödev Yükle
        </v-tooltip>
      </div>
      <v-expansion-panels class="mt-6" multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header
            color="grey lighten-4"
            style="font-size: 1.2em"
            class="google-sans-regular black--text py-1"
          >
            Ödev Tanımı
          </v-expansion-panel-header>
          <v-expansion-panel-content color="grey lighten-4">
            <v-divider class="mb-4"></v-divider>
            <div v-html="getHomework.description"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-btn
        block
        class="mt-4"
        color="#FBBC04"
        dark
        @click="attendDialog = true"
      >
        <v-icon color="white" left> mdi-upload </v-icon>
        Ödev yükle
        <v-icon color="white" right> mdi-upload </v-icon>
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import AttendHomeworkDialog from "./AttendHomeworkDialog.vue";

export default {
  name: "HomeworkDetails",
  data() {
    return {
      panel: [0],
      attendDialog: false,
    };
  },
  components: { AttendHomeworkDialog },
  methods: {
    formattedDate(date) {
      return moment(date).format("DD.MM.YYYY");
    },
  },
  computed: {
    ...mapGetters("homework", ["getHomework"]),
    ...mapGetters("teamConfig", ["getTeamConfig"]),
    getId() {
      return this.getHomework.id.substring(0, 3);
    },

    getImage() {
      return this.getTeamConfig.media.get(this.getId).picture56;
    },

    getColor2() {
      return this.getTeamConfig.media.get(this.getId).color2;
    },
    getColor3() {
      return this.getTeamConfig.media.get(this.getId).color3;
    },
  },
};
</script>

<style>
</style>