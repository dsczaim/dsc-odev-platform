<template>
  <v-dialog v-model="dialoge" persistent max-width="290">
    <v-card color="white" class="error--text">
      <v-card-title v-if="!isDeleting" class="headline">
        Hesabınızı silmek istediğinizden emin misiniz?
      </v-card-title>
      <v-card-title v-if="isDeleting" class="headline">
        Hesabınız siliniyor...
      </v-card-title>
      <v-card-text class="black--text">
        <p v-if="!isDeleting">
          Hesabınız ve ödevleriniz kalıcı olarak silinecektir ve bu işlem geri
          alınamaz. Buna rağmen silmek istediğinizden emin misiniz?
        </p>

        <div v-if="isDeleting" class="d-flex mt-6 justify-center align-center">
          <v-progress-circular
            :size="50"
            color="error"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialoge"> İptal </v-btn>
        <v-btn color="error" text @click="deleteAccn"> Sil </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteAccountDialoge",

  data() {
    return {
      isDeleting: false,
    };
  },

  props: {
    dialoge: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    ...mapActions("auth", ["deleteAccount"]),
    closeDialoge() {
      this.$emit("closeDialoge");
    },

    deleteAccn() {
      this.isDeleting = true;
      this.deleteAccount().then(() => {
        this.isDeleting = false;
        this.closeDialoge();
      });
    },
  },
};
</script>

<style>
</style>