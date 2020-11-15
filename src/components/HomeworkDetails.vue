<template>
  <div>
    <delete-attendance-dialoge
      :dialog="deleteDialog"
      :homeworkId="getHomework.id"
      v-on:closeDialoge="closeDeleteDialog"
    />
    <attend-homework-dialoge
      :dialog="attendDialog"
      v-on:closeDialoge="closeAttendDialog"
    />
    <v-sheet
      v-if="getHomework"
      class="mt-10 py-6 px-6 px-sm-8 px-md-10"
      color="white"
      elevation="3"
      width="100%"
      rounded
    >
      <homework-details-header
        :image="getImage"
        :title="getHomework.title"
        :shortDesc="getHomework.shortDesc"
        :score="getHomework.score"
        :color="getColor2"
        :startDate="getHomework.startDate"
        :endDate="getHomework.endDate"
        :isAttendable="isAttendable"
        v-on:openDialog="attendDialog = true"
      />

      <homework-details-attendance
        :uploadingAttendance="uploadingAttendance"
        :attendanceExists="attendanceExists"
        :isAttendable="isAttendable"
        v-on:deleteAtn="deleteDialog = true"
      />

      <homework-details-expansion-panels
        :attendanceData="getAttendances"
        :description="getHomework.description"
      />

      <v-btn
        block
        class="mt-4 white--text"
        color="#FBBC04"
        :disabled="!isAttendable"
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import AttendHomeworkDialoge from "./AttendHomeworkDialog.vue";
import HomeworkDetailsExpansionPanels from "@/components/HomeworkDetailsExpansionPanels";
import HomeworkDetailsHeader from "@/components/HomeworkDetailsHeader";
import HomeworkDetailsAttendance from "@/components/HomeworkDetailsAttendance";
import DeleteAttendanceDialoge from "@/components/DeleteAttendanceDialoge";

export default {
  name: "HomeworkDetails",
  data() {
    return {
      uploadingAttendance: false,
      attendanceExists: false,
      attendDialog: false,
      deleteDialog: false,
    };
  },
  created() {
    Promise.all([
      this.bindAttendancesOfHomework(this.getHomework.id),
      this.checkAttendanceExists(),
    ]).then(() => {});
  },
  components: {
    AttendHomeworkDialoge,
    HomeworkDetailsExpansionPanels,
    HomeworkDetailsHeader,
    HomeworkDetailsAttendance,
    DeleteAttendanceDialoge,
  },
  methods: {
    ...mapActions("attendance", [
      "bindAttendancesOfHomework",
      "checkAttendance",
    ]),

    checkAttendanceExists() {
      this.uploadingAttendance = true;
      return this.checkAttendance({ homeworkId: this.getHomework.id })
        .then((result) => {
          this.attendanceExists = result;
          this.uploadingAttendance = false;
        })
        .catch((err) => console.log(err));
    },

    closeAttendDialog(e) {
      if (e == "sent") {
        console.log(e);
        this.checkAttendanceExists().then(() => (this.attendDialog = false));
      } else {
        this.attendDialog = false;
      }
    },
    closeDeleteDialog() {
      this.checkAttendanceExists().then(() => (this.deleteDialog = false));
    },
  },
  computed: {
    ...mapGetters("homework", ["getHomework"]),
    ...mapGetters("homeworks", ["getToday"]),
    ...mapGetters("teamConfig", ["getTeamConfig"]),
    ...mapGetters("auth", ["getIsAdmin"]),
    ...mapGetters("attendance", ["getAttendances"]),

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

    isAttendable() {
      return moment(this.getHomework.endDate) >= this.getToday;
    },

    isAdmin() {
      return this.getIsAdmin;
    },
  },
};
</script>

<style>
</style>