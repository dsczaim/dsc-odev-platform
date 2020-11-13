<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <div class="mr-sm-2" v-on="on" v-bind="attrs">
        <!-- If user is an admin -->
        <v-badge avatar bordered overlap color="white" v-if="isAdmin">
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
export default {
  name: "UserAvatar",

  computed: {
    ...mapGetters("auth", ["getUser", "isAdmin"]),
    ...mapGetters("teamConfig", ["getTeamConfig"]),

    getBadge() {
      const id = this.getTeamConfig.ids.get(this.getUser.role);
      return this.getTeamConfig.media.get(id).picture32;
    },
  },
};
</script>

<style >
.theme--light.v-badge .v-badge__badge::after {
  border-color: #757575 !important;
  border-width: 1px;
}
</style>