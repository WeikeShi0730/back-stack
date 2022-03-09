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
} from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  collection,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";

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
// Initialize firebase
const fs = getFirestore();

//********************Auth ********************/
export const onAuthChange = onAuthStateChanged;

export const signInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // check if firestore already have this uid, if not create a new doc
    const { uid } = result.user;
    const exist = await getUserInFirestore(uid);
    if (!exist) {
      const { displayName, email } = result.user;
      await createUserInFirestore(displayName, email);
    }
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
    await createUserInFirestore(signUpInfo.displayName, signUpInfo.email);
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

export const sendChangePasswordEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error updating password: ", error);
    throw error;
  }
};

export const subscribeToAuthState = (cb) => {
  return onAuthStateChanged(auth, cb);
};

//********************DB ********************/
const sendDataToFirestore = async (dates) => {
  if (auth.currentUser !== undefined && auth.currentUser !== null) {
    const { uid } = auth.currentUser;
    // let temp = []
    // for (var date of dates) {
    //   const dataArray = Object.values(dataObjects[date]);
    //   temp.push({[date]:dataArray});
    // }
    const filteredDates = dates.filter((date) => date !== "1-setDouble");

    const docRef = doc(fs, "users", uid);
    await updateDoc(docRef, {
      dates: filteredDates,
    });
  }
};

export const subscribeToDb = (snapshot) => {
  return onValue(ref(db, "/IMU_LSM6DS3/1-setDouble"), snapshot);
};

onValue(ref(db, "/IMU_LSM6DS3/"), async (snapshot) => {
  const dates = Object.keys(snapshot.val());
  await sendDataToFirestore(dates);
});

//********************Firestore ********************/
const createUserInFirestore = async (displayName, email) => {
  try {
    const { uid } = auth.currentUser;
    await setDoc(doc(fs, "users", uid), {
      user: { displayName: displayName, email: email },
      dates: [],
    });
  } catch (error) {
    throw error;
  }
};

const getUserInFirestore = async (uid) => {
  try {
    const docRef = doc(fs, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (uid) => {
  try {
    // const { uid } = auth.currentUser;
    if (auth.currentUser) {
      const docRef = doc(fs, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data;
      } else {
        throw Error("No documents found");
      }
    }
  } catch (error) {
    throw error;
  }
};

export const subscribeToFirestore = (uid, snapshot) => {
  const dataRef = doc(fs, "users", uid);
  return onSnapshot(dataRef, snapshot);
};
