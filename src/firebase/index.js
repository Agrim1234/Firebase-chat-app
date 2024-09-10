// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
//import { refFromURL } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getStorage } from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import { 
  FIREBASE_API_KEY, 
  FIREBASE_AUTH_DOMAIN, 
  FIREBASE_PROJECT_ID, 
  FIREBASE_STORAGE_BUCKET, 
  FIREBASE_MESSAGING_SENDER_ID, 
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} from '@env';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {

//let app = initializeApp(firebaseConfig);



//self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
const app = initializeApp(firebaseConfig)
// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('BAD92DFB-E438-4AF7-BDF0-29FFFE3B0C60'),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true
// });

const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage();

console.log('FIREBASE_API_KEY:', FIREBASE_API_KEY);


const storageRef = storage.ref();

const fileRef = storageRef.child('images/');


export { db, auth, app, storage, fileRef };


//const app = firebase.initializeApp(firebaseConfig)
// } else {
//     app = firebase.app()
// }

// const auth = getAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//});


// self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

// 

//initializeAppCheck(app, { /* App Check options */ });


// Get a reference to the root of storage bucket




//const reference = storage.refFromURL(`gs://fir-chat-app-a81ce.appspot.com/images/`);

