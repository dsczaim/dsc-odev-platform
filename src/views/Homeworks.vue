<template>
  <section>
    <v-container>
      <h2 class="mt-4 google-sans-regular">Ödevler</h2>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Homeworks",
  components: {},
  methods: {
    pushResticted() {
      this.$router.push("/restricted");
    },
  },
};
</script>

<style>
</style>