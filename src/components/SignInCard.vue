<template>
  <v-card class="py-10">
    <dsc-logo />
    <google-sign-in-button v-if="!getUser" />
    <social-media />
  </v-card>
</template>

<script>
import DscLogo from "@/components/DscLogo";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import SocialMedia from "@/components/SocialMedia";

import { mapGetters } from "vuex";

export default {
  name: "SignInCard",
  components: {
    DscLogo,
    GoogleSignInButton,
    SocialMedia,
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
  },
};
</script>

<style>
</style>