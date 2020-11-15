import firestore from "@/firebase/firestore";
import firebase from "firebase";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { firestoreAction } from "vuexfire";

const today = moment()
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);

const state = {
  homeworks: [],
};
const getters = {
  getHomeworks: (state) => state.homeworks,
  getToday: () => today,
  getFlutterHomeWorks: (state) =>
    state.homeworks.filter((homework) => homework.id.startsWith("flt")),
  getActiveHomeworks(state) {
    return state.homeworks.filter(
      (homework) => moment(homework.endDate) >= today
    );
  },
  getPastHomeworks(state) {
    return state.homeworks.filter(
      (homework) => moment(homework.endDate) < today
    );
  },
};
const actions = {
  addHomework: (
    context,
    {
      title,
      score,
      startDate,
      endDate,
      description,
      shortDesc,
      isFileRequired,
      teamId,
    }
  ) => {
    const unqId = `${teamId}-${uuidv4()}`;

    firestore
      .collection("homeworks")
      .doc(unqId)
      .set({
        title,
        score,
        startDate,
        endDate,
        description,
        shortDesc,
        isFileRequired,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        deletedAt: null,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  },

  deleteHomework: (context, id) => {
    firestore
      .collection("homeworks")
      .doc(id)
      .update({
        deletedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  },

  bindHomeworks: firestoreAction((context) => {
    return context.bindFirestoreRef(
      "homeworks",
      firestore
        .collection("homeworks")
        .where("deletedAt", "==", null)
        .orderBy("createdAt", "desc")
    );
  }),
};

const mutations = {};
export default { namespaced: true, state, getters, actions, mutations };
