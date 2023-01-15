import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import "firebase/compat/firestore";
import { firebaseReducer } from "react-redux-firebase";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import activeDayReducer from "./activeDay/activeDaySlice";
import monthTasksReducer from "./monthTasks/monthTasksSlice";

const rootReducer = combineReducers({
  activeDay: activeDayReducer,
  monthTasks: monthTasksReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
