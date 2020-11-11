<template>
  <section style="height: 100%">
    <v-container class="px-md-6" v-if="!isUsersLoading">
      <h2 class="mt-4 google-sans-regular">Başarı Sıralaması</h2>

      <v-data-table
        :headers="headers"
        :items="usersData"
        :sort-by="['gen', 'name']"
        :sort-desc="[true, false]"
        item-key="name"
        locale="tr-TR"
        class="elevation-1 mt-4"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="40"
        :item-class="itemRowBackground"
      >
        <template v-slot:[`item.photo`]="{ item }">
          <v-avatar size="30" color="success" dark>
            <v-img :src="item.photo"></v-img>
          </v-avatar>
        </template>
        <template v-slot:[`item.dtb`]="{ item }">
          <v-chip :color="getColor('dtb')">
            {{ item.dtb }}
          </v-chip>
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
    </v-container>
    <circular-progress v-else />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import teamConfig from "@/firebase/teamConfig";
import CircularProgress from "@/components/CircularProgress";
const { media } = teamConfig;
export default {
  name: "SuccessRates",

  data() {
    return {
      isUsersLoading: false,
      rowsPerPageItems: [10, 20, 30, 40],
      pagination: {
        rowsPerPage: 20,
      },
    };
  },
  components: {
    CircularProgress,
  },
  mounted() {
    this.isUsersLoading = true;
    this.bindUsers()
      .then(() => (this.isUsersLoading = false))
      .catch((error) => console.log(error));
  },
  methods: {
    ...mapActions("users", ["bindUsers"]),
    itemRowBackground(item) {
      if (item.id == this.getUser.uid) return "me";
    },
    showUsers() {
      console.log(this.usersData);
    },
    getColor(teamId) {
      return media[teamId].color1;
    },
  },
  computed: {
    ...mapGetters("users", ["getUsers"]),
    ...mapGetters("auth", ["getUser"]),

    usersData() {
      const usersData = [];
      console.log(this.getUsers);
      this.getUsers.forEach(({ id, photoURL, fullName, score }) => {
        usersData.push({
          id: id,
          name: fullName,
          dtb: score.dtb,
          flt: score.flt,
          iot: score.iot,
          mcl: score.mcl,
          qtc: score.qtc,
          gen: score.dtb + score.flt + score.iot + score.mcl + score.qtc,
          photo: photoURL,
        });
      });

      return usersData;
    },
    headers() {
      return [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "photo",
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
          sortable: true,
        },
        {
          text: "Flutter Skoru",
          value: "flt",
          align: "center",
          sortable: true,
        },
        {
          text: "IOT Skoru",
          value: "iot",
          align: "center",
          sortable: true,
        },
        {
          text: "Machine Learning Skoru",
          value: "mcl",
          align: "center",
          sortable: true,
        },
        {
          text: "Quantum Computing Skoru",
          value: "qtc",
          align: "center",
          sortable: true,
        },
        {
          text: "Genel Skor",
          value: "gen",
          align: "center",
          sortable: true,
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