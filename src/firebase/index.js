// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "fir-chat-app-a81ce.appspot.com",
    messagingSenderId: "165389388785",
    appId: "1:165389388785:web:241f0a6962415c58221250",
    measurementId: "G-FWKGTZQYTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//});
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };