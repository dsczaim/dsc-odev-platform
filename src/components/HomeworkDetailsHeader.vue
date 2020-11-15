<template>
  <div>
    <div class="d-flex align-center">
      <v-img :src="image" max-width="32" class="mr-3"></v-img>
      <h2 style class="google-sans-regular">
        {{ title }}
      </h2>
    </div>
    <div class="d-flex align-center">
      <h3 class="google-sans-regular font-weight-regular">-{{ shortDesc }}</h3>
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
            {{ formattedDate(startDate) }}
          </v-chip>
        </template>
        Başlangıç tarihi: {{ formattedDate(startDate) }}
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
            {{ formattedDate(endDate) }}
          </v-chip>
        </template>
        Bitiş tarihi: {{ formattedDate(endDate) }}
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            v-on="on"
            v-bind="attrs"
            :color="color"
            dark
            class="pa-4 mr-1 mr-sm-2"
            style="font-size: 0.8em"
          >
            <v-icon small left>mdi-star</v-icon>
            {{ score }}
          </v-chip>
        </template>
        Ödev Puanı: {{ score }}
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
            :disabled="!isAttendable"
            @click="openHomeworkDialog"
          >
            <v-icon>mdi-upload</v-icon>
          </v-btn>
        </template>
        Ödev Yükle
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "HomeworkDetailsHeader",
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isAttendable: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    formattedDate(date) {
      return moment(date).format("DD.MM.YYYY");
    },

    openHomeworkDialog() {
      this.$emit("openDialog");
    },
  },
};
</script>

<style>
</style>