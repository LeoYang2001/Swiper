// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYd628Dt-MYmCFJFPIrV2q-vDkdQ8o8CQ",
  authDomain: "icebreaker-19b7c.firebaseapp.com",
  projectId: "icebreaker-19b7c",
  storageBucket: "icebreaker-19b7c.appspot.com",
  messagingSenderId: "113764099912",
  appId: "1:113764099912:web:be11235d5076af80d8357d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {app, db}