import { configureStore } from "@reduxjs/toolkit";
import { createFirestoreInstance } from "redux-firestore";
import rootReducer from "./rootReducer";
import firebase from "../firebase-config";

const store = configureStore({
  reducer: rootReducer,
});

export default store;

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

export const firebaseProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
