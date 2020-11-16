import Vue from "vue";
import Vuetify from "vuetify/lib";
// import colors from "vuetify/lib/util/colors";

// import plugin
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import CSS styles
import "tiptap-vuetify/dist/main.css";
// Vuetify's CSS styles
import "vuetify/dist/vuetify.min.css";

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

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});

export default vuetify;
