<template>
  <v-btn @click="signInWithGoogle()" class="my-3" color="#ea4335" dark>
    <v-icon left>mdi-google</v-icon>
    GOOGLE İLE GİRİŞ YAP
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "GoogleSignInButton",
  data() {
    return {};
  },
  methods: {
    ...mapActions("auth", ["signInWithGoogle"]),
  },
};
</script>
