<template>
  <section style="height: 100%">
    <circular-progress v-if="isLoading" />
    <v-container class="px-xl-10" v-else>
      <homework-details v-if="getHomework" />
      <h1 class="google-sans-regular" v-else>
        💥 Üzgünüz, belirtilen kimliğe sahip bir ödev bulunmamaktadır. 💥
      </h1>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CircularProgress from "@/components/CircularProgress";
import HomeworkDetails from "@/components/HomeworkDetails.vue";
export default {
  name: "Homework",
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    CircularProgress,
    HomeworkDetails,
  },
  methods: {
    ...mapActions("homework", ["bindHomework"]),
  },
  computed: {
    ...mapGetters("homework", ["getHomework"]),
  },
  created() {
    this.isLoading = true;
    const id = this.$route.params.id;
    this.bindHomework(id)
      .then(() => {
        this.isLoading = false;
      })
      .catch((err) => console.log(err));
  },
};
</script>
