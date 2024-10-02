// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnTOezmZn1DJotp-bxoiZkfvJglwqV7Iw",
  authDomain: "quotationerdemo.firebaseapp.com",
  projectId: "quotationerdemo",
  storageBucket: "quotationerdemo.appspot.com",
  messagingSenderId: "585467668274",
  appId: "1:585467668274:web:cd3da6c8fc2585202b992b",
  measurementId: "G-B0ZCEVNTEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };