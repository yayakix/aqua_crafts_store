import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCszmfXAr3bNsbELKaILXQR2kW_JGmHUA",
  authDomain: "crown-db-3a974.firebaseapp.com",
  projectId: "crown-db-3a974",
  storageBucket: "crown-db-3a974.appspot.com",
  messagingSenderId: "154424094838",
  appId: "1:154424094838:web:c17d7e64a91614b4c6ef57",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  //  batch to add objects to collection in one transaction

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const createUserDocument = async (userAuth, additionalInfo) => {
  if (!userAuth) {
    return;
  }
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  // DOCUMENT SNAPSHOT, can use to check if present in database with exists()
  if (!userSnapshot.exists()) {
    // create and set document
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // set doc in database
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error" + error);
    }
  }
  return userDocRef;
  // if user exists
};
// helper functions:
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// observer
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
// callback occurs whenever auth changes
