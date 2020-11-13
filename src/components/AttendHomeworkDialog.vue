<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card color="white" class="info--text">
      <v-card-title class="headline"> Ödeviniz </v-card-title>
      <v-card-text class="black--text">
        Ödevinize bir açıklama girin.
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
            v-model="file"
            outlined
            v-if="getHomework.isFileRequired"
            label="Ödev dosyası"
            hint="Ödev dosyası .zip yada .rar türünde olmalıdır"
            persistent-hint
            dense
            accept=".zip,.rar"
          ></v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" text @click="closeDialog"> İptal </v-btn>
        <v-btn :disabled="!valid" color="info" text @click="validate">
          Gönder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AttendHomeworkDialog",
  data() {
    return {
      valid: true,
      description: null,
      file: null,
      descriptionRules: [
        (v) => !!v || "Ödev açıklaması zorunlu",
        (v) =>
          (!!v && v.length > 5) ||
          "Ödev açıklaması 5 karakterden fazla olmalıdır",
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
    closeDialog() {
      this.reset();
      this.resetValidation();
      this.$emit("closeDialog");
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
