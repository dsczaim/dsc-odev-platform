<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="attendanceData"
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
          attendanceData
            .map(function (x) {
              return x.id;
            })
            .indexOf(item.id) + 1
        }}.
      </template>
      <template v-slot:[`item.homework`]="{ item }">
        <router-link :to="`/odevler/${item.homeworkId}`">
          {{ item.homeworkTitle }}
          <span class="text-caption google-sans-regular">
            #{{ item.homeworkId.substring(item.homeworkId.length - 4) }}
          </span>
        </router-link>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ item.createdAt ? timestampToDate(item.createdAt.toDate()) : "..." }}
      </template>
      <template v-slot:[`item.file`]="{ item }">
          <div v-if="item.fileURL">
            <a :href="getFileURL(item)">Ödevi indir</a>
          </div>
          <div v-else>
            {{ getFileURL(item) }}
          </div>
        </template>
      <template v-slot:[`item.description`]="{ item }">
        {{ getDescription(item) }}
      </template>
      <template v-slot:[`item.score`]="{ item }">
        {{ getScore(item) }}
      </template>
       <template v-slot:[`item.leaderMessage`]="{ item }">
        {{ getLeaderMessage(item) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "UserAttendanceDataTable",
  data() {
    return {
      emojis: [],
      giveScoreDialoge: false,
      pagination: {
        rowsPerPage: 20,
      },

      rowsPerPageItems: [10, 20, 30, 40],
    };
  },
  props: {
    attendanceData: {
      type: Array,
      required: true,
    },
  },

  methods: {
    timestampToDate(timestamp) {
      return moment(timestamp).locale("tr-TR").format("LLL"); // 14 Kasım 2020 13:23
    },
    itemRowBackground(item) {
      if (item.userId == this.getUserId) return "me";
    },

    getFileURL(item) {
      return item.fileURL ? item.fileURL : "Yok";
    },

    getId3(item) {
      return item.id.substring(0, 3);
    },

    getScore(item) {
      const id3 = this.getId3(item);
      return item.score[id3] ? item.score[id3] : "Yok";
    },

    getLeaderMessage(item) {
    return item.leaderMessage ? item.leaderMessage : "Yok"; 
    },

    getDescription(item) {
      return item.description ? item.description : "Yok";
    },

    getIsScorable() {
      return moment(this.getHomework.endDate) > this.getToday;
    },

    
  },
  computed: {
    ...mapGetters("auth", ["getIsAdmin", "getUserId"]),
    ...mapGetters("homeworks", ["getToday"]),

    headers() {
      const headers = [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "indexes",
        },
        {
          text: "Ödev",
          align: "start",
          sortable: false,
          value: "homework",
        },
        {
          text: "Gönderilme Tarihi",
          align: "start",
          sortable: true,
          value: "createdAt",
        },
        {
          text: "Ödev dosyası",
          align: "start",
          sortable: false,
          value: "file",
        },
        {
          text: "Açıklama",
          align: "start",
          sortable: false,
          value: "description",
        },
        {
          text: "Skor",
          align: "start",
          sortable: false,
          value: "score",
        },
        {
          text: "Lider Mesajı",
          align: "start",
          sortable: false,
          value: "leaderMessage"
        }
      ];

      return headers;
    },
  },
};
</script>

<style>
</style>