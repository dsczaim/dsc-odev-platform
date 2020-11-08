import firebase from "firebase";
import firebaseAuth from "@/firebase/auth";
import firestore from "@/firebase/firestore";
import router from "../../router";
import roles from "@/firebase/roles";
const provider = new firebase.auth.GoogleAuthProvider();

const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
};

const actions = {
  signInWithGoogle: ({ commit }) => {
    firebaseAuth
      .signInWithPopup(provider)
      .then(({ additionalUserInfo, user }) => {
        const { uid, displayName, email, photoURL } = user;
        const { isNewUser } = additionalUserInfo;
        const _user = {
          uid,
          displayName,
          email,
          photoURL,
          isNewUser,
        };

        var role;

        if (isNewUser) {
          role = roles.member;
          writeUser(_user, role);
          commit("setUser", { ..._user, role });
          router.push("/odevler");
        } else {
          readUser(uid).then((data) => {
            console.log(data.role);
            role = data.role;
            commit("setUser", { ..._user, role });
            router.push("/odevler");
          });
        }
      })
      .catch((err) => {
        if (err.code == "auth/popup-closed-by-user") return;
        console.log(err);
      });
  },

  logout: ({ commit }) => {
    firebaseAuth
      .signOut()
      .then(() => {
        commit("setUser", null);
        router.push("/");
      })
      .catch((err) => console.log(err));
  },
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};

const writeUser = (user, role) => {
  firestore
    .collection("users")
    .doc(user.uid)
    .set({ role })
    .then()
    .catch((err) => {
      console.log(err);
    });
};

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
