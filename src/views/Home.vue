<template>
  <div class="full d-flex align-center">
    <v-container fill-height>
      <v-row justify="center">
        <v-col align="center" cols="12" sm="12" md="10" lg="8" xl="6">
          <sign-in-card />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SignInCard from "@/components/SignInCard";

export default {
  name: "Home",
  components: {
    SignInCard,
  },
};
</script>

<style scoped>
.full {
  height: 100%;
}
</style>
