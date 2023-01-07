// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAt2UKZ3AqOCFDfYEWnITRr_x0XcznOjJY",
    authDomain: "form-89383.firebaseapp.com",
    projectId: "form-89383",
    storageBucket: "form-89383.appspot.com",
    messagingSenderId: "494373214940",
    appId: "1:494373214940:web:bc9c13516158ff30993219"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default getFirestore();