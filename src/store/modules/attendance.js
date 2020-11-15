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
    { homeworkId, description, homeworkTitle, homeworkScore, file }
  ) => {
    const userId = rootGetters["auth/getUser"].uid;
    const userFullName = rootGetters["auth/getUser"].fullName;
    const id = `${homeworkId}-${userId}`;
    var fileURL = null;

    if (file) {
      return dispatch("uploadFile", {
        id,
        file,
        userId,
        homeworkId,
        description,
        userFullName,
        homeworkScore,
        homeworkTitle,
      });
    } else {
      return dispatch("writeFirestore", {
        id,
        userId,
        fileURL,
        homeworkId,
        description,
        userFullName,
        homeworkScore,
        homeworkTitle,
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
        1000
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

  giveScore: ({ dispatch }, { homeworkId, userId, score }) => {
    const id = `${homeworkId}-${userId}`;
    const id3 = homeworkId.substring(0, 3);

    return firestore
      .collection("homework_user")
      .doc(id)
      .update({
        ["score"]: {
          [id3]: score,
        },
      })
      .then(() => {
        return dispatch("calculateUserScore", { userId });
      });
  },

  calculateUserScore: (context, { userId }) => {
    var totalScore = {
      dtb: 0,
      flt: 0,
      mcl: 0,
      iot: 0,
      qtc: 0,
    };

    return firestore
      .collection("homework_user")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          const attendance = doc.data();
          if (attendance.score.dtb) {
            totalScore.dtb += parseInt(attendance.score.dtb);
          }
          if (attendance.score.flt) {
            totalScore.flt += parseInt(attendance.score.flt);
          }
          if (attendance.score.iot) {
            totalScore.iot += parseInt(attendance.score.iot);
          }
          if (attendance.score.mcl) {
            totalScore.mcl += parseInt(attendance.score.mcl);
          }
          if (attendance.score.qtc) {
            totalScore.qtc += parseInt(attendance.score.qtc);
          }
          if (attendance.score.dsc) {
            const dscScore = parseInt(attendance.score.dsc);
            totalScore.dtb += dscScore;
            totalScore.flt += dscScore;
            totalScore.iot += dscScore;
            totalScore.mcl += dscScore;
            totalScore.qtc += dscScore;
          }
        });

        return firestore
          .collection("users")
          .doc(userId)
          .update({ score: totalScore });
      });
  },

  writeFirestore: (
    context,
    {
      id,
      userId,
      fileURL,
      homeworkId,
      description,
      userFullName,
      homeworkTitle,
      homeworkScore,
    }
  ) => {
    const attendance = {
      userId: userId,
      homeworkId: homeworkId,
      description: description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      score: {
        dtb: null,
        flt: null,
        mcl: null,
        qtc: null,
        iot: null,
        dsc: null,
      },
      fileURL: fileURL,
      userFullName: userFullName,
      homeworkTitle: homeworkTitle,
      homeworkScore: homeworkScore,
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
    {
      id,
      file,
      userId,
      homeworkId,
      description,
      userFullName,
      homeworkScore,
      homeworkTitle,
    }
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
            fileURL,
            homeworkId,
            description,
            userFullName,
            homeworkTitle,
            homeworkScore,
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
