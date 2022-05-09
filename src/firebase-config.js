import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2vwwd3GPaqZfT4KiA23myQ-sUnHx4dT8",
  authDomain: "microblog-yohi.firebaseapp.com",
  projectId: "microblog-yohi",
  storageBucket: "microblog-yohi.appspot.com",
  messagingSenderId: "286859906591",
  appId: "1:286859906591:web:a5111184e08fe0b12d4f2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
