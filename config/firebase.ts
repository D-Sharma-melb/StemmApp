import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBS4drOf5Tsugg20uI6XNNTH8KJ6r9_flg",
  authDomain: "stemmapp-fc9f2.firebaseapp.com",
  projectId: "stemmapp-fc9f2",
  storageBucket: "stemmapp-fc9f2.firebasestorage.app",
  messagingSenderId: "276623995364",
  appId: "1:276623995364:web:017ba421773c08e12557f1",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(
    AsyncStorage
  ),
});

// Firestore
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

export default app;