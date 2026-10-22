// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp2QvudEiUkTEQuszvOFBlmnmgnyT6EQs",
  authDomain: "coins-dc6b5.firebaseapp.com",
  projectId: "coins-dc6b5",
  storageBucket: "coins-dc6b5.firebasestorage.app",
  messagingSenderId: "389493723050",
  appId: "1:389493723050:web:c3fcdd49bf1c55301865d3",
  measurementId: "G-SYMX9GN22Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
