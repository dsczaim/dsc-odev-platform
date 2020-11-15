<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card color="white" class="error--text">
      <v-card-title class="headline">
        Silmek istediğinizden emin misiniz?
      </v-card-title>
      <v-card-text class="black--text">
        Ödeviniz kalıcı olarak silinecektir ve bu işlem geri alınamaz. Buna
        rağmen silmek istediğinizden emin misiniz?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialog"> İptal </v-btn>
        <v-btn color="error" text @click="deleteAtn"> Sil </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteAttendanceDialoge",

  props: {
    homeworkId: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    ...mapActions("attendance", ["deleteAttendance"]),
    closeDialog() {
      this.$emit("closeDialoge");
    },

    deleteAtn() {
      this.deleteAttendance({ homeworkId: this.homeworkId }).then(() => {
        this.closeDialog();
      });
    },
  },
};
</script>

<style>
</style>