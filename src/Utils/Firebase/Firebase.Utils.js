import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getDoc, setDoc, doc, getFirestore ,collection,writeBatch,query,getDocs} from "firebase/firestore";
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
export const SignwithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};



export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};


export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if(!userAuth) return;
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
        ...additionalInformation
      });
    } catch (error) {
      console.log("error in creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword =async(email,password)=>{
    if(!email || !password) return ;
    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword =async(email,password)=>{
  if(!email || !password) return ;
  return await signInWithEmailAndPassword(auth,email,password)
}

export const SignOutUser =async()=>await signOut(auth)

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth,callback)