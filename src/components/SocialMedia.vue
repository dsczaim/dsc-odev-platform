<template>
  <v-row class="mt-6 mb-0 py-0">
    <v-col cols="12" class="my-0 py-0">
      <v-hover v-slot="{ hover }">
        <v-btn icon class="mx-1" :color="hover ? 'red' : ''"
          ><v-icon>mdi-youtube</v-icon></v-btn
        >
      </v-hover>
      <v-hover v-slot="{ hover }">
        <v-btn icon class="mx-1" :color="hover ? '#738ADB' : ''"
          ><v-icon>mdi-discord</v-icon></v-btn
        >
      </v-hover>
      <v-hover v-slot="{ hover }">
        <v-btn icon class="mx-1" :color="hover ? '#F77737' : ''"
          ><v-icon>mdi-instagram</v-icon></v-btn
        >
      </v-hover>
      <v-hover v-slot="{ hover }">
        <v-btn icon class="mx-1" :color="hover ? '#006192' : ''"
          ><v-icon>mdi-linkedin</v-icon></v-btn
        >
      </v-hover>
      <v-hover v-slot="{ hover }">
        <v-btn icon class="mx-1" :color="hover ? '#211F1F' : ''"
          ><v-icon>mdi-github</v-icon></v-btn
        >
      </v-hover>
    </v-col>
    <v-row justify="center">
      <a
        target="_blank"
        href="https://www.linkedin.com/in/nurettin-resul-a3a0141a7/"
        style="text-decoration: none; color: grey; font-size: 10px"
        class="mt-4 google-sans-regular"
      >
        Created by N. Resul Tanyıldızı | Flutter Team Lead
      </a>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: "SocialMedia",
};
</script>

<style>
</style>