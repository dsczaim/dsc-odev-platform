import { firestoreAction } from "vuexfire";
import firestore from "@/firebase/firestore";
const state = {
  homework: null,
};
const getters = {
  getHomework: (state) => state.homework,
};
const actions = {
  bindHomework: firestoreAction((context, id) => {
    console.log(id);
    return context.bindFirestoreRef(
      "homework",
      firestore.collection("homeworks").doc(id)
    );
  }),
  unbindHomework: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("homework");
  }),
};
const mutations = {};
export default { namespaced: true, state, getters, actions, mutations };
