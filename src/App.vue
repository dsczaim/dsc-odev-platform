<template>
  <v-app class="primary">
    <navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@font-face {
  font-family: "GoogleSansMedium";
  src: local("GoogleSansMedium"),
    url(./assets/google_sans/GoogleSans-Medium.ttf) format("truetype");
}
@font-face {
  font-family: "GoogleSansRegular";
  src: local("GoogleSansRegular"),
    url(./assets/google_sans/GoogleSans-Regular.ttf) format("truetype");
}
.theme--light .v-main__wrap {
  background: rgb(242, 242, 242);
}
.google-sans-medium {
  font-family: "GoogleSansMedium";
  color: #6c6b73;
}

.google-sans-regular {
  font-family: "GoogleSansRegular";
  color: #6c6b73;
}
</style>

