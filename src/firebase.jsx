import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  OAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    return { error: null };
  } catch (err) {
    alert(err.message);
    return { error: err };
  }
};

const signInWithApple = async () => {
  try {
    await signInWithPopup(auth, appleProvider);
    return { error: null };
  } catch (err) {
    alert(err.message);
    return { error: err };
  }
};

const signInWithFacebook = async () => {
  try {
    await signInWithPopup(auth, facebookProvider);
    return { error: null };
  } catch (err) {
    alert(err.message);
    return { error: err };
  }
};

const signInWithTwitter = async () => {
  try {
    await signInWithPopup(auth, twitterProvider);
    return { error: null };
  } catch (err) {
    alert(err.message);
    return { error: err };
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { error: null };
  } catch (err) {
    alert(err.message);
    return { error: err };
  }
};

const signInAsGuest = async () => {
  try {
    await signInAnonymously(auth);
    return { error: null };
  } catch (err) {
    alert(err.message);
    return { error: err };
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { error: null };
  } catch (err) {
    alert(err.message);
    return { error: err };
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithApple,
  signInWithFacebook,
  signInWithTwitter,
  logInWithEmailAndPassword,
  signInAsGuest,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
