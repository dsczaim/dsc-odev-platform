<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <div class="mr-sm-2" v-on="on" v-bind="attrs">
        <!-- If user is an admin -->
        <v-badge avatar bordered overlap color="grey darken-1" v-if="isAdmin">
          <template v-slot:badge>
            <v-avatar>
              <v-img :src="getBadge"></v-img>
            </v-avatar>
          </template>
          <v-avatar size="37" color="#6c6b73">
            <v-avatar size="35">
              <v-img :src="getUser.photoURL"></v-img>
            </v-avatar>
          </v-avatar>
        </v-badge>
        <!-- If user is a member -->
        <v-avatar size="37" v-else color="grey darken-1">
          <v-avatar size="35">
            <v-img :src="getUser.photoURL"></v-img>
          </v-avatar>
        </v-avatar>
      </div>
    </template>
    {{ getUser.fullName }}
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import teamConfig from "@/firebase/teamConfig";
const { ids, media } = teamConfig;
export default {
  name: "UserAvatar",

  computed: {
    ...mapGetters("auth", ["getUser", "isAdmin"]),
    getBadge() {
      const id = ids[this.getUser.role];
      return media[id].picture32;
    },
  },
};
</script>

<style>
</style>