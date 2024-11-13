// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBt-zOAGu617ClfUxaDqgxDCa24f5F9oP0",
    authDomain: "fir-firstbase-24afa.firebaseapp.com",
    projectId: "fir-firstbase-24afa",
    storageBucket: "fir-firstbase-24afa.appspot.com",
    messagingSenderId: "441220147747",
    appId: "1:441220147747:web:52bf2f9cefea5420ff9f96",
    measurementId: "G-7RD6BH46YG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
// const dbShowTime = getFirestore(app);
export { auth, db, googleProvider, storage };
