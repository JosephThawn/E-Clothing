import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  //you do not need to worry about this API key
  apiKey: "AIzaSyDPPKXyf2bKFk9l3sxMxsSK7unyvDxbWvo",
  authDomain: "e-clothing-db-99a19.firebaseapp.com",
  projectId: "e-clothing-db-99a19",
  storageBucket: "e-clothing-db-99a19.appspot.com",
  messagingSenderId: "610312625073",
  appId: "1:610312625073:web:b9245d6563d78dda6d3b90",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  //if user data does not exist
  //create set the docment with the data fron userAuth in my collection

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
      console.log("error creating the user", error.message);
    }
  }
  //if user data exists
  return userDocRef;
};
