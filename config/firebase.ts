import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBS4drOf5Tsugg20uI6XNNTH8KJ6r9_flg",
  authDomain: "stemmapp-fc9f2.firebaseapp.com",
  projectId: "stemmapp-fc9f2",
  storageBucket: "stemmapp-fc9f2.firebasestorage.app",
  messagingSenderId: "276623995364",
  appId: "1:276623995364:web:017ba421773c08e12557f1",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
