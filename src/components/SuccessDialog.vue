<template>
  <v-dialog v-model="isSent" persistent max-width="290">
    <v-card color="white">
      <v-card-title class="google-sans-medium" style="color: green">
        Başarılı
      </v-card-title>
      <v-card-text class="google-sans-medium" style="color: green"
        >Ödev başarıyla oluşturuldu</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="changeIsSent"> Tamam </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: { isSent: Boolean },
  methods: {
    changeIsSent() {
      this.$emit("isSentFalse");
    },
  },
};
</script>

<style>
</style>