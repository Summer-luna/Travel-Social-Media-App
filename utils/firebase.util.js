import { initializeApp, getApps, getApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize firebase authentication and get a reference to the service
export const auth = getAuth(app);
// get a reference to firestore
export const db = getFirestore(app);
// get a reference to storage service, used to create reference
export const storage = getStorage(app);

export const fileUpload = (filename, file) => {
  const storageRef = ref(storage, filename);
  // upload file and metadata
  return uploadBytesResumable(storageRef, file);
};

// authentication providers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGithubPopup = () =>
  signInWithPopup(auth, githubProvider);

export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);

// create auth user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// create user document from authentication
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
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

export const SignInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const getUserDocument = async (userAuth) => {
  // get user document path reference
  const userDocRef = doc(db, "users", userAuth.uid);
  // get document snapshot
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    return "no such document!";
  }
  return userSnapshot.data();
};

export const signOutCurrentUser = () => signOut(auth);

export const TrackAuthStateChange = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);
      //console.log("user logged in", currentUser);
    } else {
      setCurrentUser(null);
      //console.log("user logged out", currentUser);
    }
  });
};
