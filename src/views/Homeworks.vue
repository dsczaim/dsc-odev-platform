<template>
  <div>
    <v-container>
      <h1>Homeworks</h1>
    </v-container>
  </div>
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