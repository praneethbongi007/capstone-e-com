import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { getDoc, setDoc, doc, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDCbK60P4So5jnAuvXB9D0eQRmrfad9OOA",
  authDomain: "e-com-db-8ee08.firebaseapp.com",
  projectId: "e-com-db-8ee08",
  storageBucket: "e-com-db-8ee08.appspot.com",
  messagingSenderId: "50452130050",
  appId: "1:50452130050:web:30dafd2a13836366c0ba1b",
};

const firebaseapp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const SignwithGooglepopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error in creating user", error.message);
    }
  }
  return userDocRef;
};