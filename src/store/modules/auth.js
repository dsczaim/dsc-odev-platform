import firebase from "firebase";
import firebaseAuth from "@/firebase/auth";
import firestore from "@/firebase/firestore";
import router from "../../router";
import teamConfig from "@/firebase/teamConfig";
const provider = new firebase.auth.GoogleAuthProvider();
const { roles } = teamConfig;

const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
  isAdmin: (state) => {
    if (!state.user || !state.user.role) return false;
    return (
      state.user.role == roles.flutter ||
      state.user.role == roles.database ||
      state.user.role == roles.iot ||
      state.user.role == roles.quantum ||
      state.user.role == roles.social ||
      state.user.role == roles.machine
    );
  },
};

const actions = {
  signInWithGoogle: ({ commit, dispatch }) => {
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
          _user.role = roles.member;
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
                throw new Error("No such document!");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        if (err.code == "auth/popup-closed-by-user") return;
        console.log(err);
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

// const updateUser = ({ uid, photoURL }) => {
//   firestore
//     .collection("users")
//     .doc(uid)
//     .update({ photoURL })
//     .then()
//     .catch((err) => {
//       console.log(err);
//     });
// };
