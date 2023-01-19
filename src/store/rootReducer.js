import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import "firebase/compat/firestore";
import { firebaseReducer } from "react-redux-firebase";
import activeDayReducer from "./activeDay/activeDaySlice";
import monthTasksReducer from "./monthTasks/monthTasksSlice";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  activeDay: activeDayReducer,
  monthTasks: monthTasksReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
