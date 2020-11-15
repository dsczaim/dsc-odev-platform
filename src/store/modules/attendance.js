import { firestoreAction } from "vuexfire";
import firestore from "@/firebase/firestore";
import firebaseStorage from "@/firebase/firebaseStorage";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";

const state = {
  attendances: [],
};
const getters = {
  getAttendances: (state) => state.attendances,
};
const actions = {
  addAttendance: async (
    { dispatch, rootGetters },
    { homeworkId, description, homeworkTitle, file }
  ) => {
    const userId = rootGetters["auth/getUser"].uid;
    const userFullName = rootGetters["auth/getUser"].fullName;
    const id = `${homeworkId}-${userId}`;
    var fileURL = null;

    if (file) {
      return dispatch("uploadFile", {
        file,
        id,
        userId,
        userFullName,
        homeworkId,
        description,
        homeworkTitle,
      });
    } else {
      return dispatch("writeFirestore", {
        id,
        userId,
        userFullName,
        homeworkId,
        description,
        homeworkTitle,
        fileURL,
      });
    }
  },

  checkAttendance: ({ rootGetters }, { homeworkId }) => {
    const userId = rootGetters["auth/getUserId"];
    const id = `${homeworkId}-${userId}`;

    return new Promise((resolve) =>
      setTimeout(
        () =>
          firestore
            .collection("homework_user")
            .doc(id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                resolve(true);
              } else {
                resolve(false);
              }
            }),
        500
      )
    );
  },

  deleteAttendance: ({ rootGetters }, { homeworkId }) => {
    const userId = rootGetters["auth/getUserId"];
    const id = `${homeworkId}-${userId}`;

    return firestore
      .collection("homework_user")
      .doc(id)
      .delete()
      .then()
      .catch((err) => console.log(err));
  },

  writeFirestore: (
    context,
    {
      homeworkId,
      userId,
      userFullName,
      id,
      fileURL,
      description,
      homeworkTitle,
    }
  ) => {
    const attendance = {
      userId: userId,
      homeworkId: homeworkId,
      description: description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      score: null,
      fileURL: fileURL,
      userFullName: userFullName,
      homeworkTitle: homeworkTitle,
    };

    return firestore
      .collection("homework_user")
      .doc(id)
      .set(attendance)
      .then()
      .catch((err) => console.log(err));
  },

  uploadFile: (
    { dispatch },
    { homeworkId, userId, userFullName, id, file, description, homeworkTitle }
  ) => {
    const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;

    return firebaseStorage
      .ref(homeworkId)
      .child(fileName)
      .put(file)
      .then((uploadTaskSnapshot) => {
        uploadTaskSnapshot.ref.getDownloadURL().then((fileURL) => {
          return dispatch("writeFirestore", {
            id,
            userId,
            userFullName,
            homeworkId,
            description,
            homeworkTitle,
            fileURL,
          });
        });
      });
  },
  bindAttendancesOfHomework: firestoreAction((context, homeworkId) => {
    return context.bindFirestoreRef(
      "attendances",
      firestore
        .collection("homework_user")
        .where("homeworkId", "==", homeworkId)
        .orderBy("createdAt", "desc")
    );
  }),
  bindAttendancesOfUser: firestoreAction((context, userId) => {
    return context.bindFirestoreRef(
      "attendances",
      firestore
        .collection("homework_user")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
    );
  }),
};
const mutations = {};
export default { namespaced: true, state, getters, actions, mutations };
