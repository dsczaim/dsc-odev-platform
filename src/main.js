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
    const { uid, displayName, photoURL, email } = user;
    var role;
    readUser(uid).then((data) => {
      role = data.role;
      store.commit("auth/setUser", {
        uid,
        displayName,
        photoURL,
        email,
        role,
      });
      if (!app) {
        app = new Vue({
          store,
          router,
          vuetify,
          render: (h) => h(App),
        }).$mount("#app");
      }
    });
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

const readUser = async (uid) => {
  try {
    const doc = await firestore
      .collection("users")
      .doc(uid)
      .get();

    if (doc.exists) {
      return doc.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (err) {
    console.log(err);
  }
};
