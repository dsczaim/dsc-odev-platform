import { firestoreAction } from "vuexfire";
import firestore from "@/firebase/firestore";
const state = {
  users: [],
};
const getters = {
  getUsers: (state) => state.users,
};
const actions = {
  bindUsers: firestoreAction((context) => {
    return context.bindFirestoreRef(
      "users",
      firestore
        .collection("users")
        .where("role", "==", "member")
        .where("fullName", "!=", null)
    );
  }),
};
const mutations = {};
export default { namespaced: true, state, getters, actions, mutations };
