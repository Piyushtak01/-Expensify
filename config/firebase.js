// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore , collection} from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
 //https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANK3zGfdi1A_WDP_Fpj7iiS_YyhM-dQWc",
  authDomain: "expensify-e9749.firebaseapp.com",
  projectId: "expensify-e9749",
  storageBucket: "expensify-e9749.appspot.com",
  messagingSenderId: "1095305815146",
  appId: "1:1095305815146:web:5de4c01c7d4a5c8fb71613"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = getAuth(app)


 export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const tripsRef =   collection(db , 'trips')
export const expensesRef =   collection(db , 'expenses')



export default app;