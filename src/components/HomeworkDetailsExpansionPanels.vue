<template>
  <v-expansion-panels class="mt-6" multiple v-model="panels">
    <v-expansion-panel>
      <v-expansion-panel-header
        color="grey lighten-4"
        style="font-size: 1.2em"
        class="google-sans-regular black--text py-1"
      >
        Gönderilen Ödevler
      </v-expansion-panel-header>
      <v-expansion-panel-content color="grey lighten-4">
        <v-divider class="mb-4"></v-divider>
        <homework-attendance-data-table :attendanceData="attendanceData" />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header
        color="grey lighten-4"
        style="font-size: 1.2em"
        class="google-sans-regular black--text py-1"
      >
        Ödev Tanımı
      </v-expansion-panel-header>
      <v-expansion-panel-content color="grey lighten-4">
        <v-divider class="mb-4"></v-divider>

        <v-row justify="center">
          <v-col cols="12" md="10" lg="8" xl="6">
            <div class="homework-container">
              <v-img
                style="margin: auto"
                class="mb-5"
                max-width="381"
                max-height="35"
                src="@/assets/developerstudent.png"
              ></v-img>
              <div class="homework-content" v-html="description"></div>
            </div>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import HomeworkAttendanceDataTable from "@/components/HomeworkAttendanceDataTable";
export default {
  name: "HomeworkDetailsExpansionPanels",
  data() {
    return {
      panels: [0, 1],
    };
  },
  components: {
    HomeworkAttendanceDataTable,
  },
  props: {
    attendanceData: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style >
@font-face {
  font-family: "GoogleSansRegular";
  src: local("GoogleSansRegular"),
    url(../assets/google_sans/GoogleSans-Regular.ttf)format("truetype");
}
.homework-container {
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 20px;
}

.homework-content {
  overflow: hidden;
}

.homework-content a {
  display: inline;
  text-overflow: ellipsis !important;
  color: black;
}
</style>