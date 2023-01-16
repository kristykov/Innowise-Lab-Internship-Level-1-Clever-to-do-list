import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqJq251LxnMZVwBEZxcviU7Kluk9rRkXk",
  authDomain: "to-do-47c88.firebaseapp.com",
  projectId: "to-do-47c88",
  storageBucket: "to-do-47c88.appspot.com",
  messagingSenderId: "483597153569",
  appId: "1:483597153569:web:7569f0a94981e39517ba60",
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
