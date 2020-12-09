<template>
  <div>
    <give-score-dialoge
      ref="giveScore"
      :dialoge="giveScoreDialoge"
      v-on:closeDialoge="giveScoreDialoge = false"
    />
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
        <div v-if="item.fileURL">
          <a v-if="canSeeDetails(item)" :href="getFileURL(item)">Ödevi indir</a>
          <div v-else>{{ getFileURL(item) }}</div>
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
      <template v-if="getIsAdmin" v-slot:[`item.action`]="{ item }">
        <v-btn icon small @click="passDataToDialoge(item)"
          ><v-icon>mdi-pencil-box</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import GiveScoreDialoge from "@/components/GiveScoreDialoge";
export default {
  name: "HomeworkAttendanceDataTable",
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
  components: {
    GiveScoreDialoge,
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
    passDataToDialoge(item) {
      this.$refs.giveScore.item = item;
      this.$refs.giveScore.leaderMessage = 
      item.leaderMessage ? item.leaderMessage :   
      "Tebrik ederim " + item.userFullName + ", harikasın. 🎉" 
      
      this.giveScoreDialoge = true;
      this.$refs.giveScore.userDescription = item.description;

    },
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

    getId3(item) {
      return item.id.substring(0, 3);
    },

    getScore(item) {
      if (this.canSeeDetails(item)) {
        const id3 = this.getId3(item);
        return item.score[id3]
          ? `${item.score[id3]}/${item.homeworkScore}`
          : "Yok";
      } else {
        return this.getRandomEmoji();
      }
    },

    getLeaderMessage(item) {
      if(this.canSeeDetails(item)) {
       return item.leaderMessage ? item.leaderMessage : "Yok";
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

    getIsScorable() {
      return moment(this.getHomework.endDate) > this.getToday;
    },
  },
  computed: {
    ...mapGetters("auth", ["getIsAdmin", "getUserId"]),
    ...mapGetters("homeworks", ["getToday"]),
    ...mapGetters("homework", ["getHomework"]),

    headers() {
      const headers = [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "indexes",
        },
        {
          text: "Gönderen",
          align: "start",
          sortable: false,
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
          sortable: false,
          value: "score",
        },
        {
          text: "Lider Mesajı",
          align: "start",
          sortable: false,
          value: "leaderMessage",
        },
      ];

      if (this.getIsAdmin) {
        headers.push({
          text: "İşlem",
          align: "start",
          sortable: false,
          value: "action",
        });
      }

      return headers;
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