<template>
  <v-card
    :color="color1"
    min-height="180"
    dark
    elevation="2"
    style="overflow: hidden"
  >
    <v-card-title class="text-truncate">
      <span
        class="google-sans-medium font-weight-light text-truncate"
        :style="past ? 'color:dark-grey' : `color:${color3}`"
        >{{ title }}
      </span>
    </v-card-title>

    <v-card-subtitle class="">
      <v-avatar
        size="24"
        :color="past ? 'grey darken-1' : `white`"
        class="mr-1"
      >
        <img :src="picture32" :alt="id.substring(0, 3)" />
      </v-avatar>
      <span
        class="google-sans-regular font-weight-light"
        :style="past ? 'color:dark-grey' : `color:${color3}`"
      >
        -{{ teamName(id) }}
      </span>
    </v-card-subtitle>

    <v-card-text
      class="google-sans-medium font-weight-regular text-truncate"
      :style="
        past
          ? 'color: #424242; font-size:18px'
          : `color:${color2}; font-size:18px`
      "
      >{{ shortDesc }}
    </v-card-text>

    <v-card-actions class="pl-2 pr-4">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            :color="past ? '' : 'green'"
            class="mr-2"
            style="font-size: 12px"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon small left class="mr-1">mdi-calendar</v-icon
            >{{ formattedDate(startDate) }}</v-chip
          >
        </template>
        Başlangıç tarihi
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            :color="past ? '' : 'red accent-2'"
            class="mr-2"
            style="font-size: 12px"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon small left class="mr-1">mdi-calendar</v-icon
            >{{ formattedDate(endDate) }}</v-chip
          >
        </template>
        Bitiş tarihi
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="ma-0" v-on="on" v-bind="attrs">
            <v-icon
              class="ma-0"
              :color="past ? 'grey darken-3' : 'purple lighten-1'"
              >mdi-clipboard-text</v-icon
            >
          </v-btn>
        </template>
        Ödevi incele
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-0 mr-2"
            v-if="canUserDelete"
            @click="deleteHomework({ id })"
            icon
            v-on="on"
            v-bind="attrs"
          >
            <v-icon color="grey darken-4"> mdi-delete-forever </v-icon></v-btn
          >
        </template>
        Kalıcı olarak sil
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-1"
            :color="past ? 'grey darken-3' : color2"
            v-on="on"
            v-bind="attrs"
          >
            mdi-star
          </v-icon>
          <span
            class="subheading mt-1"
            :style="past ? 'color: #424242' : `color:${color2}`"
            >{{ score }}</span
          >
        </template>
        Ödev puanı
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import teamConfig from "@/firebase/teamConfig";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
const { media, idToName, ids } = teamConfig;
export default {
  name: "HomeworkCard",
  props: {
    id: String,
    title: String,
    team: String,
    startDate: String,
    endDate: String,
    shortDesc: String,
    score: Number,
    past: Boolean,
  },

  methods: {
    ...mapActions("homeworks", ["deleteHomework"]),

    formattedDate(date) {
      return moment(date).format("DD.MM.YYYY");
    },

    teamName(id) {
      return idToName[id.substring(0, 3)];
    },
  },

  computed: {
    ...mapGetters("auth", ["getUser"]),
    fitTitle() {
      if (this.title.length > 15) return this.title.substring(0, 15) + "...";
      else return this.title;
    },
    color1() {
      return this.past ? "grey" : media[this.id.substring(0, 3)].color1;
    },
    color2() {
      return media[this.id.substring(0, 3)].color2;
    },
    color3() {
      return media[this.id.substring(0, 3)].color3;
    },
    picture32() {
      return media[this.id.substring(0, 3)].picture32;
    },

    canUserDelete() {
      return ids[this.getUser.role] === this.id.substring(0, 3) && !this.past;
    },

    isAttendable() {
      const today = moment().hour(0).minute(0).second(0).millisecond(0);
      const start = moment(this.startDate);
      const end = moment(this.endDate);

      return start <= today && end >= today;
    },
  },
};
</script>

<style>
</style>