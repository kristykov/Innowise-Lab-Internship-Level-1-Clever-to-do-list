import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import App from "./App";
import store, { firebaseProps } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <ReactReduxFirebaseProvider {...firebaseProps}>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactReduxFirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
