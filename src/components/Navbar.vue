<template>
  <nav v-if="isNotLogin">
    <v-app-bar elevation="2" flat app>
      <v-app-bar-nav-icon
        color="#6c6b73"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <router-link to="/odevler">
          <span class="google-sans-regular">Google DSC </span>
          <span class="google-sans-medium">Zaim</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()" text>
        <span class="google-sans-regular">Çıkış</span>
        <v-icon color="#6c6b73" right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="teal grey lighten-4">
      <v-row class="mt-5" align="center" justify="center">
        <img src="@/assets/onlylogo.png" alt="avatar-2" />
        <span class="google-sans-regular mr-1">Google DSC</span>
        <span class="google-sans-medium">Zaim</span>
      </v-row>

      <v-list>
        <v-list-item
          v-for="link in links.filter((link) => filterLinks(link))"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title dark class="google-sans-medium">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import links from "@/router/links";
import { mapGetters } from "vuex";
import teamConfig from "@/firebase/teamConfig";

export default {
  data() {
    return {
      drawer: true,
      links: links,
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    filterLinks(link) {
      const userRole = this.getUser.role;
      if (userRole == teamConfig.roles.member)
        return link.role == teamConfig.roles.member;
      else if (this.isAdmin) return true;
    },
  },
  computed: {
    ...mapGetters("auth", ["getUser", "isAdmin"]),
    isNotLogin() {
      return this.$route.path !== "/";
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>