<template>
  <div>
    <v-btn @click="logout()" dark
      ><v-icon light left>mdi-exit-to-app</v-icon>ÇIKIŞ YAP</v-btn
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LogoutButton",
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>

<style>
</style>