// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1HnPaaFBo4GOoc54LDxifZyhoaSZSkD0",
  authDomain: "quotation-generator-2aa1e.firebaseapp.com",
  projectId: "quotation-generator-2aa1e",
  storageBucket: "quotation-generator-2aa1e.appspot.com",
  messagingSenderId: "143620852986",
  appId: "1:143620852986:web:d0a7d20a0cad57e1628d43",
  measurementId: "G-LNPGFVCWWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };