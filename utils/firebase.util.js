import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseUtil = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseUtil);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Initialize firebase authentication and get a reference to the service
export const auth = getAuth(app);
export const signInWithGoogleProvider = () =>
  signInWithPopup(auth, googleProvider);
export const db = getFirestore(app);

// create auth user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth.uid) return;

  // get user document path reference
  const userDocRef = doc(db, "users", userAuth.uid);
  // get document snapshot
  const userSnapshot = await getDoc(userDocRef);
  // check if document path reference exists in firestore
  // if not exists, create document in firestore, otherwise return document
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log("error" + err.message);
    }
  }
  return userDocRef;
};
