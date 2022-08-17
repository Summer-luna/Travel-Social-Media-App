import { getApp, getApps, initializeApp } from "firebase/app";
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
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  collection,
  query,
  getDocs,
  updateDoc,
  addDoc,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { data } from "autoprefixer";

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

export const TrackAuthStateChange = (nextObserver) => {
  onAuthStateChanged(auth, nextObserver);
};

// store form fields into firebase
// add a posts document into user/userId
export const createPostsDocument = async (userAuth, postData) => {
  const postRef = await addDoc(collection(db, "posts"), {
    userId: userAuth.uid,
    ...postData,
  });
};

export const updateAdditionalInfo = async (postId, data) => {
  const ref = doc(db, `posts/${postId}`);
  return await setDoc(
    ref,
    {
      data,
    },
    { merge: true }
  );
};

export const getAllContent = async (postId) => {
  const q = doc(db, "posts", `${postId}`);
  const snapshot = await getDoc(q);
  return snapshot.data();
};

// get user's all posts
export const getAllPosts = async (userAuth) => {
  const q = query(collection(db, "posts"), where("userId", "==", userAuth.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, data: doc.data() };
  });
};

export const getPublicPosts = async (userAuth) => {
  const q = query(
    collection(db, "posts"),
    where("postStatus", "==", "yes"),
    where("userId", "!=", `${userAuth.uid}`)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, data: doc.data() };
  });
};

export const getSinglePostDocument = async (userAuth, postId) => {
  const postRef = doc(db, `posts/${postId}`);
  const querySnapshot = await getDoc(postRef);
  return querySnapshot.data();
};

export const updateDocument = async (userAuth, postId, data) => {
  const docRef = doc(db, `users/${userAuth.uid}/posts/${postId}`);
  await updateDoc(docRef, data);
};
