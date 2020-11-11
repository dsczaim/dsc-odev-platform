<template>
  <section>
    <v-container>
      <h2 class="mt-4 mx-3 google-sans-regular">Ödev Ekle</h2>
      <add-homework-form class="mx-3" />
    </v-container>
  </section>
</template>

<script>
import AddHomeworkForm from "@/components/AddHomeworkForm";
export default {
  name: "AddHomework",
  components: {
    AddHomeworkForm,
  },
};
</script>

<style>
</style>