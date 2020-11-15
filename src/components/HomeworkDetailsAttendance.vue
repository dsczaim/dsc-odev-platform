<template>
  <div>
    <v-chip v-if="uploadingAttendance" class="mt-3" color="cyan" dark>
      <v-progress-circular size="20" color="white" indeterminate>
      </v-progress-circular>
    </v-chip>
    <div class="d-flex align-end" v-else>
      <v-chip
        v-if="attendanceExists"
        class="pa-4 mt-3 mr-1 mr-sm-2"
        color="cyan"
        style="font-size: 0.8em"
        dark
      >
        <v-icon left>mdi-checkbox-marked-circle</v-icon>
        Ödeviniz mevcut
      </v-chip>
      <v-chip v-else class="mt-3 mr-1 mr-sm-2" color="grey darken-3" dark>
        <v-icon left>mdi-close</v-icon>
        Ödeviniz yok
      </v-chip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="attendanceExists"
            v-on="on"
            v-bind="attrs"
            color="error"
            elevation="0"
            x-small
            fab
            :disabled="!isAttendable"
            @click="deleteAtn"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        Ödevi sil
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeworkDetailsAttendance",
  props: {
    uploadingAttendance: {
      type: Boolean,
      required: true,
    },

    attendanceExists: {
      type: Boolean,
      required: true,
    },
    isAttendable: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    deleteAtn() {
      this.$emit("deleteAtn");
    },
  },
};
</script>

<style>
</style>