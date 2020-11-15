<template>
  <section>
    <delete-account-dialoge
      :dialoge="deleteDialoge"
      v-on:closeDialoge="deleteDialoge = false"
    />
    <v-container class="px-md-6">
      <h2 class="mt-4 google-sans-regular">Hesabım</h2>

      <h3 class="google-sans-regular mt-2">
        <v-avatar size="47" color="#6c6b73">
          <v-avatar size="45">
            <v-img :src="getUser.photoURL"></v-img>
          </v-avatar>
        </v-avatar>
        <span class="font-weight-regular">
          {{ getUser.fullName }} - {{ getRole }}
        </span>
      </h3>
      <h2 class="mt-4 google-sans-regular">Ödevlerim</h2>
      <user-attendance-data-table :attendanceData="getAttendances" />
      <h2 class="mt-4 google-sans-regular">Hesap İşlemleri</h2>
      <v-btn class="mt-3" color="error" dark @click="deleteDialoge = true">
        Hesabımı Sil
      </v-btn>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DeleteAccountDialoge from "../components/DeleteAccountDialoge.vue";
import UserAttendanceDataTable from "../components/UserAttendanceDataTable.vue";

export default {
  components: { UserAttendanceDataTable, DeleteAccountDialoge },
  name: "Profile",
  data() {
    return {
      deleteDialoge: false,
    };
  },
  created() {
    this.bindAttendancesOfUser(this.getUser.uid);
  },
  methods: {
    ...mapActions("attendance", ["bindAttendancesOfUser"]),
    ...mapActions("auth", ["deleteAccount"]),
  },
  computed: {
    ...mapGetters("auth", ["getUser", "getIsAdmin"]),
    ...mapGetters("teamConfig", ["getTeamConfig"]),
    ...mapGetters("attendance", ["getAttendances"]),

    getRole() {
      var role = this.getTeamConfig.teams.get(this.getUser.role);
      if (this.getIsAdmin) role += " Lead";

      return role;
    },
  },
};
</script>

<style>
</style>