import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNMF2YVRprIyb9MtDOGWGRvhJnFXFxzHo",
  authDomain: "todo1-d9f75.firebaseapp.com",
  projectId: "todo1-d9f75",
  storageBucket: "todo1-d9f75.appspot.com",
  messagingSenderId: "1091815435238",
  appId: "1:1091815435238:web:404340228206bc2b00c427",
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
