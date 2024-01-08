// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBu_o49QRvb4rliuB9N90HT7Oa2lfCeh_8",
    authDomain: "electricity-marketplace.firebaseapp.com",
    projectId: "electricity-marketplace",
    storageBucket: "electricity-marketplace.appspot.com",
    messagingSenderId: "757862678273",
    appId: "1:757862678273:web:a75d40606e432600432500"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore()