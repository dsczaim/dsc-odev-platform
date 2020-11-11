<template>
  <google-sign-in-button v-if="!getUser" />
</template>

<script>
import GoogleSignInButton from "@/components/GoogleSignInButton";

import { mapGetters } from "vuex";

export default {
  name: "SignInCard",
  components: {
    GoogleSignInButton,
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
  },
};
</script>

<style>
</style>