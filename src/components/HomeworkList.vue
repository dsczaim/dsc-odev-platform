<template>
  <section class="px-6">
    <h2 class="mt-4 ml-3 google-sans-regular">Aktif Ödevler</h2>
    <v-row class="ma-0" style="margin: 0; padding: 0">
      <v-col
        cols="12"
        sm="6"
        lg="4"
        xl="3"
        v-for="homework in getActiveHomeworks"
        :key="homework.id"
      >
        <homework-card
          :title="homework.title"
          :id="homework.id"
          :startDate="homework.startDate"
          :endDate="homework.endDate"
          :shortDesc="homework.shortDesc"
          :score="homework.score"
        />
      </v-col>
    </v-row>
    <v-divider class="mt-5"></v-divider>
    <h2 class="mt-4 ml-3 google-sans-regular">Geçmiş Ödevler</h2>
    <v-row class="ma-0">
      <v-col
        cols="12"
        sm="6"
        lg="4"
        xl="3"
        v-for="homework in getPastHomeworks"
        :key="homework.id"
      >
        <homework-card
          :past="true"
          :title="homework.title"
          :id="homework.id"
          :startDate="homework.startDate"
          :endDate="homework.endDate"
          :shortDesc="homework.shortDesc"
          :score="homework.score"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import HomeworkCard from "@/components/HomeworkCard";
export default {
  name: "HomeworkList",
  components: {
    HomeworkCard,
  },
  computed: {
    ...mapGetters("homeworks", [
      "getHomeworks",
      "getActiveHomeworks",
      "getPastHomeworks",
    ]),
  },
};
</script>

<style>
</style>