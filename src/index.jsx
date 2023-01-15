import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import App from "./App";
import store, { firebaseProps } from "./store/store";

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <ReactReduxFirebaseProvider {...firebaseProps}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ReactReduxFirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
