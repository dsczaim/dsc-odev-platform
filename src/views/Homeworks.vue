<template>
  <section style="height: 100%">
    <homework-list v-if="!isHomeworksLoading" />
    <circular-progress v-else />
  </section>
</template>

<script>
import HomeworkList from "@/components/HomeworkList";
import CircularProgress from "@/components/CircularProgress";
import { mapActions } from "vuex";
export default {
  name: "Homeworks",
  components: {
    HomeworkList,
    CircularProgress,
  },
  data() {
    return {
      isHomeworksLoading: false,
    };
  },
  mounted() {
    this.isHomeworksLoading = true;
    this.bindHomeworks()
      .then(() => (this.isHomeworksLoading = false))
      .catch((error) => console.log(error));
  },
  methods: {
    ...mapActions("homeworks", ["bindHomeworks"]),
  },
};
</script>

