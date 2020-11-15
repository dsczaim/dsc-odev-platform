<template>
  <v-data-table
    :headers="headers"
    :items="usersData"
    locale="tr-TR"
    class="elevation-1 mt-4"
    :footer-props="{
      'items-per-page-options': [10, 20, 30, 40, 50],
    }"
    :items-per-page="40"
    :item-class="itemRowBackground"
  >
    <template v-slot:[`item.indexes`]="{ item }">
      {{
        usersData
          .map(function (x) {
            return x.id;
          })
          .indexOf(item.id) + 1
      }}.
    </template>
    <template v-slot:[`item.photo`]="{ item }">
      <v-avatar size="30" color="success" dark>
        <v-img :src="item.photo"></v-img>
      </v-avatar>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      {{ item.name }}
      <span class="text-caption google-sans-regular">
        #{{ item.id.substring(item.id.length - 4) }}
      </span>
    </template>
    <template v-slot:[`item.dtb`]="{ item }">
      <v-chip :color="getColor('dtb')"> {{ item.dtb }}</v-chip>
    </template>
    <template v-slot:[`item.flt`]="{ item }">
      <v-chip :color="getColor('flt')" dark>
        {{ item.flt }}
      </v-chip>
    </template>
    <template v-slot:[`item.iot`]="{ item }">
      <v-chip :color="getColor('iot')">
        {{ item.iot }}
      </v-chip>
    </template>
    <template v-slot:[`item.mcl`]="{ item }">
      <v-chip :color="getColor('mcl')" dark>
        {{ item.mcl }}
      </v-chip>
    </template>
    <template v-slot:[`item.qtc`]="{ item }">
      <v-chip :color="getColor('qtc')" dark>
        {{ item.qtc }}
      </v-chip>
    </template>
    <template v-slot:[`item.gen`]="{ item }">
      <v-chip color="success" dark>
        {{ item.gen }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UsersDataTable",
  data() {
    return {
      rowsPerPageItems: [10, 20, 30, 40],
      pagination: {
        rowsPerPage: 20,
      },
    };
  },
  props: {
    usersData: Array,
  },
  methods: {
    itemRowBackground(item) {
      if (item.id == this.getUserId) return "me";
    },

    getColor(teamId) {
      return this.getTeamConfig.media.get(teamId).color1;
    },
  },
  computed: {
    ...mapGetters("auth", ["getUserId"]),
    ...mapGetters("teamConfig", ["getTeamConfig"]),

    headers() {
      return [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "photo",
        },
        {
          text: "",
          align: "end",
          sortable: false,
          value: "indexes",
        },

        {
          text: "İsim",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Database & Firebase Skoru",
          value: "dtb",
          align: "center",
          sortable: false,
        },
        {
          text: "Flutter Skoru",
          value: "flt",
          align: "center",
          sortable: false,
        },
        {
          text: "IOT Skoru",
          value: "iot",
          align: "center",
          sortable: false,
        },
        {
          text: "Machine Learning Skoru",
          value: "mcl",
          align: "center",
          sortable: false,
        },
        {
          text: "Quantum Computing Skoru",
          value: "qtc",
          align: "center",
          sortable: false,
        },
      ];
    },
  },
};
</script>

<style>
.me {
  background-color: #fffde7;
}
</style>