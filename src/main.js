import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebaseAuth from "./firebase/auth";
import firestore from "./firebase/firestore";
Vue.config.productionTip = false;

let app;

firebaseAuth.onAuthStateChanged(async (user) => {
  if (user) {
    const { uid, photoURL } = user;
    var role = null;
    var fullName = null;
    var score = null;
    firestore
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          role = data.role;
          fullName = data.fullName;
          score = data.score;
          store.commit("auth/setUser", {
            uid,
            fullName,
            photoURL,
            role,
            score,
          });
        }
        if (!app) {
          app = new Vue({
            store,
            router,
            vuetify,
            render: (h) => h(App),
          }).$mount("#app");
        }
      })
      .catch((err) => console.log(err));
  } else {
    if (!app) {
      app = new Vue({
        store,
        router,
        vuetify,
        render: (h) => h(App),
      }).$mount("#app");
    }
  }
});
