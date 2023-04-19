// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPZIdoV_qgbpir9_cpxSh9g2Eenz7IsiU",
    authDomain: "form-restaurant-e5b8f.firebaseapp.com",
    projectId: "form-restaurant-e5b8f",
    storageBucket: "form-restaurant-e5b8f.appspot.com",
    messagingSenderId: "568902043851",
    appId: "1:568902043851:web:8a8f0dc72f1aac5597734e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();