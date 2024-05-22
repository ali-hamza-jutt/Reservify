import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAi9vAdQx-Eju_8ACK0iYa5RqIeDoko_0s",
  authDomain: "reservify-2e57f.firebaseapp.com",
  projectId: "reservify-2e57f",
  storageBucket: "reservify-2e57f.appspot.com",
  messagingSenderId: "262884007659",
  appId: "1:262884007659:web:74c732292436ab3fac68ae",
  measurementId: "G-C171X3S2KX",
  databaseURL: "https://reservify-2e57f-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, app };
