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
import { doc, setDoc, getDoc } from "firebase/firestore";

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

const sendReferralLink = async (uid, email) => {
  const apiUrl = process.env.REACT_APP_API_URL + "/referral/send_referral_link";
  const payload = { uid, email };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to send referral link");
    }

    console.log("Referral link sent successfully");
  } catch (error) {
    console.error("Error sending referral link:", error);
  }
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
      });
      await sendReferralLink(user.uid, user.email);
      console.log("User added to Firestore");
    } else {
      console.log("User already exists in Firestore");
    }

    return { error: null };
  } catch (err) {
    return { error: err };
  }
};

const signInWithApple = async () => {
  try {
    await signInWithPopup(auth, appleProvider);
    return { error: null };
  } catch (err) {
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
    return { error: err };
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { error: null };
  } catch (err) {
    return { error: err };
  }
};

const signInAsGuest = async () => {
  try {
    await signInAnonymously(auth);
    return { error: null };
  } catch (err) {
    return { error: err };
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
      });
      await sendReferralLink(user.uid, user.email);
      console.log("User added to Firestore");
    } else {
      console.log("User already exists in Firestore");
    }

    return { error: null };
  } catch (err) {
    return { error: err };
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    return { error: err };
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
