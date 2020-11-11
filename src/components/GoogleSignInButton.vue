<template>
  <v-btn
    @click.prevent="signIn()"
    class="my-3"
    color="#ea4335"
    dark
    :loading="loading"
  >
    <v-icon left>mdi-google</v-icon>
    GOOGLE İLE GİRİŞ YAP
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "GoogleSignInButton",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions("auth", ["signInWithGoogle"]),
    signIn() {
      this.loading = true;
      this.signInWithGoogle().then(() => {
        this.loading = false;
      });
    },
  },
};
</script>
