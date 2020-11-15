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
        <attendance-data-table :attendanceData="attendanceData" />
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
        <div v-html="description"></div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import AttendanceDataTable from "@/components/AttendanceDataTable";
export default {
  name: "HomeworkDetailsExpansionPanels",
  data() {
    return {
      panels: [0, 1],
    };
  },
  components: {
    AttendanceDataTable,
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

<style>
</style>