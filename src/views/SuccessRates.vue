<template>
  <section style="height: 100%">
    <v-container class="px-md-6" v-if="!isUsersLoading">
      <h2 class="mt-4 google-sans-regular">Başarı Puanları</h2>

      <div class="mt-4 google-sans-regular">
        Hangisine göre sıralamak istediğinizi seçin
      </div>

      <v-radio-group row v-model="teamRadio" @change="sortedUsersData">
        <v-radio value="name">
          <template v-slot:label> İsim </template>
        </v-radio>
        <v-radio
          v-for="id in getTeamIds.filter((tid) => tid != 'dsc')"
          :key="id"
          :value="id"
        >
          <template v-slot:label>
            {{ getTeamNameFromId(id) }}
          </template>
        </v-radio>
      </v-radio-group>

      <users-data-table :usersData="sortedUsers" />
    </v-container>
    <circular-progress v-else />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CircularProgress from "@/components/CircularProgress";
import UsersDataTable from "@/components/UsersDataTable";

export default {
  name: "SuccessRates",

  data() {
    return {
      isUsersLoading: false,
      teamRadio: "name",
      sortedUsers: this.usersData,
    };
  },
  components: {
    CircularProgress,
    UsersDataTable,
  },

  mounted() {
    this.isUsersLoading = true;
    this.bindUsers()
      .then(() => {
        this.isUsersLoading = false;
        this.sortedUsersData("name");
      })
      .catch((error) => console.log(error));
  },
  methods: {
    ...mapActions("users", ["bindUsers"]),
    getTeamNameFromId(id) {
      return this.getTeamConfig.idToName[id];
    },

    sortedUsersData(scoreId) {
      if (scoreId == "name") {
        this.sortedUsers = this.usersData.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      }

      this.sortedUsers = this.usersData.sort((a, b) => {
        return b[scoreId] - a[scoreId];
      });
    },
  },
  computed: {
    ...mapGetters("users", ["getUsers"]),
    ...mapGetters("teamConfig", ["getTeamConfig"]),

    getTeamIds() {
      return Array.from(this.getTeamConfig.ids.values());
    },

    usersData() {
      const usersData = [];
      this.getUsers.forEach(({ id, photoURL, fullName, score }) => {
        usersData.push({
          id: id,
          name: fullName,
          dtb: score.dtb,
          flt: score.flt,
          iot: score.iot,
          mcl: score.mcl,
          qtc: score.qtc,
          photo: photoURL,
        });
      });

      return usersData;
    },
  },
};
</script>

<style>
</style>