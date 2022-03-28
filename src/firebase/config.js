import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const key = process.env.REACT_APP_FIREBASE_KEY;
const authdomain = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const storagebucket = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const messagingsenderid = process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID;
const appid = process.env.REACT_APP_FIREBASE_APPID;

const firebaseConfig = {
  apiKey: "AIzaSyBEJjoPuvGUGVJ_Hjw8BLrWdFzdzimmSPo",
  authDomain: `${authdomain}`,
  projectId: "harcama-takip-63ac9",
  storageBucket: `${storagebucket}`,
  messagingSenderId: `${messagingsenderid}`,
  appId: `${appid}`,
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
