import Vue from "vue";
import Vuetify from "vuetify/lib";
// import colors from "vuetify/lib/util/colors";

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
        background: "#b71c1c",
      },
    },
  },
});

Vue.use(Vuetify);

export default vuetify;
