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
import {
  getFirestore,
  query,
  getDocs,
  doc,
  getDoc,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
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
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    localStorage.setItem("user", user.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithApple = async () => {
  try {
    const res = await signInWithPopup(auth, appleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "apple",
        email: user.email,
      });
    }
    localStorage.setItem("user", user.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "facebook",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithTwitter = async () => {
  try {
    const res = await signInWithPopup(auth, twitterProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "twitter",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("user", res.user.uid);
    return { error: null };
  } catch (err) {
    console.error(err);
    // return the error instead of alerting
    return { error: err.message };
  }
};

const signInAsGuest = async () => {
  try {
    localStorage.removeItem("user");
    const res = await signInAnonymously(auth);

    //add user and set the response into local storage
    await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      name: "Guest User",
      authProvider: "local",
      dateTime: new Date(),
    });

    localStorage.setItem("user", res.user.uid);

    return { error: null };
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    localStorage.setItem("user", user.uid);

    return { error: null };
  } catch (err) {
    console.error(err);
    // return the error instead of alerting
    return { error: err.message };
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
