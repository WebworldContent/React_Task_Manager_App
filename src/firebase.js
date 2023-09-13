// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtiCTnPZu8RGIWHm08rxdBd-P0MoVa2Iw",
  authDomain: "my-react-app-38413.firebaseapp.com",
  databaseURL: "https://my-react-app-38413-default-rtdb.firebaseio.com",
  projectId: "my-react-app-38413",
  storageBucket: "my-react-app-38413.appspot.com",
  messagingSenderId: "441969352449",
  appId: "1:441969352449:web:a73a68a4181ae76bbb4500",
  measurementId: "G-TLD3MQYZ6P"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
