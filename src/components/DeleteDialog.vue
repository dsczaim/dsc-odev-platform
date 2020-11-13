<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card color="white" class="error--text">
      <v-card-title class="headline">
        Silmek istediğinizden emin misiniz?
      </v-card-title>
      <v-card-text class="black--text">
        Eğer gönderilmiş ödevler varsa bu ödevi silmek hatalara ya da veri
        kaybına sebep olabilir. Yine de silmek istediğinizden emin misiniz?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialog"> İptal </v-btn>
        <v-btn color="error" text @click="deleteHw"> Sil </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteDialog",

  props: {
    cardId: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    ...mapActions("homeworks", ["deleteHomework"]),
    closeDialog() {
      this.$emit("closeDialog");
    },

    deleteHw() {
      this.deleteHomework(this.cardId)
        .then(() => {
          this.closeDialog();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>