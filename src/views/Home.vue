<template>
  <section class="full d-flex align-center">
    <v-container fill-height>
      <v-row justify="center">
        <v-col align="center" cols="12" sm="12" md="10" lg="8" xl="6">
          <v-card class="py-10">
            <dsc-logo />
            <sign-in-card v-if="!getUser" />
            <user-info-form v-if="getUser && !getUser.fullName" />
            <div class="full" v-if="getUser && getUser.fullName">
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
            <social-media />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import SignInCard from "@/components/SignInCard";
import UserInfoForm from "@/components/UserInfoForm";
import DscLogo from "@/components/DscLogo";
import SocialMedia from "@/components/SocialMedia";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    SignInCard,
    UserInfoForm,
    DscLogo,
    SocialMedia,
  },

  watch: {
    getUser(newUser) {
      if (newUser.fullName) {
        this.$router.push("/odevler");
      }
    },
  },

  computed: {
    ...mapGetters("auth", ["getUser"]),
  },
};
</script>

<style scoped>
.full {
  height: 100%;
}
</style>
