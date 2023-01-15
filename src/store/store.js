import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { createFirestoreInstance } from "redux-firestore";
import persistedReducer from "./rootReducer";
import firebase from "../firebase-config";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "@@reactReduxFirebase/LOGIN",
          "@@reactReduxFirebase/LOGOUT",
        ],
      },
    }),
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
