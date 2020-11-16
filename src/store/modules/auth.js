import firebase from "firebase/app";
import firebaseAuth from "@/firebase/auth";
import firestore from "@/firebase/firestore";
import router from "../../router";
const provider = new firebase.auth.GoogleAuthProvider();

const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
  getUserId: (state) => state.user.uid,
  getIsAdmin: (state, getters, rootState) => {
    if (!state.user || !state.user.role) return false;
    return (
      state.user.role == rootState.teamConfig.roles.flutter ||
      state.user.role == rootState.teamConfig.roles.database ||
      state.user.role == rootState.teamConfig.roles.iot ||
      state.user.role == rootState.teamConfig.roles.quantum ||
      state.user.role == rootState.teamConfig.roles.social ||
      state.user.role == rootState.teamConfig.roles.machine ||
      state.user.role == rootState.teamConfig.roles.dsc
    );
  },
};

const actions = {
  signInWithGoogle: ({ commit, dispatch, rootState }) => {
    firebaseAuth
      .signInWithPopup(provider)
      .then(({ additionalUserInfo, user }) => {
        var fullName = null;
        var role = null;
        var scores = null;

        const { uid, photoURL } = user;
        const { isNewUser } = additionalUserInfo;
        const _user = {
          uid,
          fullName,
          photoURL,
          role,
          scores,
        };

        if (isNewUser) {
          _user.role = rootState.teamConfig.roles.member;
          _user.score = {
            dtb: 0,
            flt: 0,
            iot: 0,
            mcl: 0,
            qtc: 0,
          };
          dispatch("writeUser", _user);
          commit("setUser", _user);
        } else {
          firestore
            .collection("users")
            .doc(uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                _user.role = doc.data().role;
                _user.fullName = doc.data().fullName;
                _user.score = doc.data().score;
                commit("setUser", { _user });
              } else {
                throw new Error("no-such-document");
              }
            })
            .catch((err) => {
              if (err.message === "no-such-document") {
                _user.role = rootState.teamConfig.roles.member;
                _user.score = {
                  dtb: 0,
                  flt: 0,
                  iot: 0,
                  mcl: 0,
                  qtc: 0,
                };
                dispatch("writeUser", _user);
                commit("setUser", _user);
              }
            });
        }
      })
      .catch((err) => {
        if (err.code == "auth/popup-closed-by-user") return;
      });
  },

  updateFullName: ({ commit }, fullName) => {
    const { uid, role, photoURL } = getters.getUser(state);
    firestore
      .collection("users")
      .doc(uid)
      .update({ fullName })
      .then(() => {
        commit("setUser", { uid, fullName, photoURL, role });
      })
      .catch((err) => {
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

  deleteAccount: async ({ commit, getters }) => {
    const uid = getters["getUserId"];
    await firestore
      .collection("homework_user")
      .where("userId", "==", uid)
      .get()
      .then(async (querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          await doc.ref.delete();
        });

        await firestore
          .collection("users")
          .doc(uid)
          .delete();

        await firebaseAuth.currentUser.delete();
        commit("setUser", null);
        router.push("/");
      })
      .catch((err) => console.log(err));
  },

  writeUser: (context, { uid, photoURL, fullName, role, score }) => {
    firestore
      .collection("users")
      .doc(uid)
      .set({ fullName, photoURL, role, score })
      .then()
      .catch((err) => {
        console.log(err);
      });
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
