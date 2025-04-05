// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5UX-rUE8FoWs-2u0ZGby8bbhkrL1BqGk",
  authDomain: "westudy-bc2fc.firebaseapp.com",
  projectId: "westudy-bc2fc",
  storageBucket: "westudy-bc2fc.firebasestorage.app",
  messagingSenderId: "749941520303",
  appId: "1:749941520303:web:85f2974c3aa830200c215a",
  measurementId: "G-PYXGRQMGD0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
