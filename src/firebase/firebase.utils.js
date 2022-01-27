// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCUKBUwf1bnrxDEyOwO7I7IvTIGOK0zxwY",
  authDomain: "test2-529b3.firebaseapp.com",
  databaseURL: "https://test2-529b3-default-rtdb.firebaseio.com",
  projectId: "test2-529b3",
  storageBucket: "test2-529b3.appspot.com",
  messagingSenderId: "953401057455",
  appId: "1:953401057455:web:beb8d64adce30b09e5745a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize authentication
export const auth = getAuth();
// Initialize database
export const db = getDatabase(app);
export const dbRef = ref(db, "IMU_LSM6DS3/2-pushJSON");

// Auth
export const onAuthChange = onAuthStateChanged;

export const signInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};

export const signUpWithEmailAndPassword = async (signUpInfo) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      signUpInfo.email,
      signUpInfo.password
    );
    await updateProfile(auth.currentUser, {
      displayName: signUpInfo.displayName,
    });
    // const { password, ...signUpInfoWithoutPassword } = signUpInfo;
    // await createUserFirestore(signUpInfoWithoutPassword);
    // return signUpInfoWithoutPassword;
  } catch (error) {
    console.error("Error creating the profile: ", error);
    throw error;
  }
};

export const signInWithEmail = async (signInInfo) => {
  try {
    await signInWithEmailAndPassword(
      auth,
      signInInfo.email,
      signInInfo.password
    );
  } catch (error) {
    console.error("Error signing: ", error);
    throw error;
  }
};

export const signOutGoogle = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

export const sendChangePasswordEmail = async (user) => {
  try {
    await sendPasswordResetEmail(auth, user.email);
  } catch (error) {
    console.error("Error updating password: ", error);
    throw error;
  }
};
