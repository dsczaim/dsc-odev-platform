<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card color="white" class="info--text">
      <v-card-title class="headline"> Ödeviniz </v-card-title>
      <v-card-text class="black--text">
        Eğer daha önce ödev yüklediyseniz bu ödev diğerinin yerine geçecektir.
        <v-form v-model="valid" class="mt-4" ref="attendForm">
          <v-textarea
            label="Ödev açıklaması"
            outlined
            v-model="description"
            hint="Lütfen ödevinize bir açıklama girin"
            persistent-hint
            :rules="descriptionRules"
            required
          >
          </v-textarea>
          <v-file-input
            class="text-caption"
            show-size
            v-model="file"
            outlined
            v-if="getHomework.isFileRequired"
            label="Ödev dosyası"
            hint="Ödev dosyası .zip yada .rar türünde olmalıdır"
            persistent-hint
            dense
            :rules="fileRules"
            accept=".zip,.rar"
          ></v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="isUploading"
          color="info"
          text
          @click="closeDialog('cancel')"
        >
          İptal
        </v-btn>
        <v-btn
          readOnly
          text
          color="info"
          :disabled="!valid"
          :loading="isUploading"
          @click="addAttend"
        >
          Gönder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AttendHomeworkDialog",
  data() {
    return {
      isUploading: false,
      valid: true,
      description: null,
      file: null,
      descriptionRules: [
        (v) => !!v || "Ödev açıklaması zorunludur",
        (v) =>
          (!!v && v.length > 5) ||
          "Ödev açıklaması 5 karakterden fazla olmalıdır",
      ],
      fileRules: [
        (v) => !!v || "Dosya eklemek zorunludur",
        (v) =>
          (!!v && v.size < 20000000) || "Dosya boyutu 20MB'den az olmalıdır",
      ],
    };
  },

  props: {
    dialog: Boolean,
  },

  watch: {
    file: (newValue) => {
      console.log(newValue);
    },
  },

  methods: {
    ...mapActions("attendance", ["addAttendance"]),
    addAttend() {
      this.isUploading = true;
      this.addAttendance({
        homeworkId: this.getHomework.id,
        description: this.description,
        homeworkTitle: this.getHomework.title,
        file: this.file,
      }).then(() => {
        this.isUploading = false;
        this.closeDialog("sent");
      });
    },
    closeDialog(type) {
      this.reset();
      this.resetValidation();
      this.$emit("closeDialoge", type);
    },
    validate() {
      this.$refs.attendForm.validate();
    },
    reset() {
      this.$refs.attendForm.reset();
    },
    resetValidation() {
      this.$refs.attendForm.resetValidation();
    },
  },
  computed: {
    ...mapGetters("homework", ["getHomework"]),
  },
};
</script>
