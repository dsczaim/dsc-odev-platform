<template>
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
    <template v-slot:[`item.sender`]="{ item }">
      {{ item.userFullName }}
      <span class="text-caption google-sans-regular">
        #{{ item.userId.substring(item.userId.length - 4) }}
      </span>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ item.createdAt ? timestampToDate(item.createdAt.toDate()) : "..." }}
    </template>
    <template v-slot:[`item.file`]="{ item }">
      <a
        v-if="canSeeDetails(item)"
        class="google-sans-medium"
        :href="getFileURL(item)"
        >Ödevi indir</a
      >
      <div v-else>
        {{ getFileURL(item) }}
      </div>
    </template>
    <template v-slot:[`item.description`]="{ item }">
      {{ getDescription(item) }}
    </template>
    <template v-slot:[`item.score`]="{ item }"> {{ getScore(item) }} </template>
  </v-data-table>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "AttendanceDataTable",
  data() {
    return {
      rowsPerPageItems: [10, 20, 30, 40],
      pagination: {
        rowsPerPage: 20,
      },
      emojis: [],
    };
  },
  props: {
    attendanceData: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.emojis = emojis;
  },

  methods: {
    timestampToDate(timestamp) {
      return moment(timestamp).locale("tr-TR").format("LLL"); // 14 Kasım 2020 13:23
    },
    itemRowBackground(item) {
      if (item.userId == this.getUserId) return "me";
    },

    canSeeDetails(item) {
      return item.userId == this.getUserId || this.getIsAdmin;
    },

    getFileURL(item) {
      if (this.canSeeDetails(item)) {
        return item.fileURL ? item.fileURL : "Yok";
      } else {
        return this.getRandomEmoji();
      }
    },

    getScore(item) {
      if (this.canSeeDetails(item)) {
        return item.score ? item.score : "Yok";
      } else {
        return this.getRandomEmoji();
      }
    },

    getDescription(item) {
      if (this.canSeeDetails(item)) {
        return item.description ? item.description : "Yok";
      } else {
        return this.getRandomEmoji();
      }
    },

    getRandomEmoji() {
      return this.emojis[Math.floor(Math.random() * this.emojis.length)];
    },
  },
  computed: {
    ...mapGetters("auth", ["getIsAdmin", "getUserId"]),

    headers() {
      return [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "indexes",
        },
        {
          text: "Gönderen",
          align: "start",
          sortable: true,
          value: "sender",
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
          sortable: true,
          value: "score",
        },
      ];
    },
  },
};

const emojis = [
  "🎈",
  "✨",
  "🎉",
  "🎊",
  "🎁",
  "🎨",
  "🏓",
  "🎧",
  "🏹",
  "⏳",
  "💎",
  "🏆",
  "💰",
  "💻",
  "🧬",
  "💉",
  "☎",
  "📀",
  "📚",
  "📅",
  "📎",
  "📌",
  "🧸",
  "🎓",
  "👑",
  "🍕",
  "🍔",
  "🍟",
  "🌭",
  "🥞",
  "🍳",
  "🥐",
  "🥪",
  "🥩",
  "🍣",
  "🥘",
  "🍩",
  "🎂",
  "🍪",
  "🍦",
  "🍫",
  "🍬",
  "🍭",
  "🍯",
];
</script>

<style>
.me {
  background-color: #fffde7;
}
</style>