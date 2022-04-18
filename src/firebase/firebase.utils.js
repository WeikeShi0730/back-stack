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
} from "firebase/auth";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import moment from "moment";

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
    if (auth.currentUser) {
      await signOut(auth);
    }
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
    const filteredDates = dates.filter((date) => date !== "1-setDouble");
    const docRef = doc(fs, "users", uid);
    await updateDoc(docRef, {
      dates: filteredDates,
    });
    return filteredDates;
  }
};

export const getDateData = async (dates, startTime, endTime) => {
  try {
    const devices = await getDiviceList();
    let graphDatas = [];
    for (const date of dates) {
      const dbRef = ref(db);
      const device = devices.find((device) => device.activate === true);
      if (device) {
        const snapshot = await get(
          child(dbRef, `${device.name}/${date.value}`)
        );
        if (snapshot.exists()) {
          const datas = Object.values(snapshot.val());
          const filteredDatas =
            datas && startTime && endTime
              ? datas.filter((data) => {
                  return (
                    data.Hours >= startTime.value && data.Hours < endTime.value
                  );
                })
              : [];
          if (filteredDatas.length > 0) {
            let averagedData = [];
            let currentMin = filteredDatas[0].Minutes;
            let valueX,
              valueY,
              avgX,
              avgY,
              count = 0;
            for (let data of filteredDatas) {
              if (data.Minutes !== currentMin) {
                avgX = valueX / count;
                avgY = valueY / count;
                averagedData.push({
                  time: moment(
                    `2022-01-01-${data.Hours}:${data.Minutes}:${data.Seconds}`,
                    "YYYY-MM-DD-k:m:s"
                  ).unix(),
                  avgX: avgX,
                  avgY: avgY,
                });
                valueX = valueY = avgX = avgY = count = 0;
                currentMin = data.Minutes;
              }
              valueX += data.kalAngleX;
              valueY += data.kalAngleY;
              count++;
            }
            graphDatas.push({ date: date, data: averagedData });
          }
        } else {
          throw Error("DB doc not found.tgdsfgfdg");
        }
      }
    }
    return graphDatas;
  } catch (error) {
    throw error;
  }
};

const checkDbDevices = async (serialNumber) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, "Devices"));
  if (snapshot.exists()) {
    const deviceList = Object.keys(snapshot.val());
    return deviceList.includes(serialNumber);
  } else {
    throw Error("Devices list not avaliable now.");
  }
};

export const subscribeToDb = (device, snapshot) => {
  return onValue(ref(db, `/${device}/1-setDouble`), snapshot);
};

//********************Firestore ********************/
const createUserInFirestore = async (displayName, email) => {
  try {
    const { uid } = auth.currentUser;
    await setDoc(doc(fs, "users", uid), {
      user: { displayName: displayName, email: email },
      dates: [],
      devices: [],
    });
  } catch (error) {
    throw error;
  }
};

export const addDevice = async (serialNumber) => {
  if (auth.currentUser !== undefined && auth.currentUser !== null) {
    try {
      const found = await checkDbDevices(serialNumber);
      if (found) {
        const currentUserRef = doc(fs, "users", auth.currentUser?.uid);
        const docSnap = await getDoc(currentUserRef);
        if (docSnap.exists()) {
          let deviceList = docSnap.data().devices;
          if (deviceList.includes(serialNumber)) return;
          deviceList.forEach((device) => (device.activate = false));
          deviceList.push({ name: serialNumber, activate: true });
          deviceList.sort((a, b) => (a === b ? 0 : a ? -1 : 1));
          await updateDoc(currentUserRef, {
            devices: deviceList,
          });
        } else {
          throw Error("No doc found!");
        }
      } else {
        throw Error("Invalid serial number.");
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw Error("Please login first");
  }
};

export const switchDevice = async (device) => {
  if (auth.currentUser !== undefined && auth.currentUser !== null) {
    try {
      const found = await checkDbDevices(device.name);
      if (found) {
        const currentUserRef = doc(fs, "users", auth.currentUser?.uid);
        const docSnap = await getDoc(currentUserRef);
        if (docSnap.exists()) {
          let deviceList = docSnap.data().devices;
          deviceList.forEach((device) => (device.activate = false));
          const foundIndex = deviceList.findIndex(
            (e) => e.name === device.name
          );
          deviceList[foundIndex] = { name: device.name, activate: true };
          await updateDoc(currentUserRef, {
            devices: deviceList,
          });
          return deviceList;
        } else {
          throw Error("No doc found!");
        }
      } else {
        throw Error("Invalid serial number.");
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw Error("Please login first");
  }
};

export const removeDevice = async (device) => {
  if (auth.currentUser !== undefined && auth.currentUser !== null) {
    try {
      const found = await checkDbDevices(device.name);
      if (found) {
        const currentUserRef = doc(fs, "users", auth.currentUser?.uid);
        const docSnap = await getDoc(currentUserRef);
        if (docSnap.exists()) {
          let deviceList = docSnap.data().devices;
          const foundIndex = deviceList.findIndex(
            (e) => e.name === device.name
          );
          deviceList.splice(foundIndex, 1);
          await updateDoc(currentUserRef, {
            devices: deviceList,
          });
          return deviceList;
        } else {
          throw Error("No doc found!");
        }
      } else {
        throw Error("Invalid serial number.");
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw Error("Please login first");
  }
};

export const getDiviceList = async () => {
  if (auth.currentUser !== undefined && auth.currentUser !== null) {
    try {
      const currentUserRef = doc(fs, "users", auth.currentUser?.uid);
      const docSnap = await getDoc(currentUserRef);
      if (docSnap.exists()) {
        return docSnap.data().devices;
      }
    } catch (error) {
      throw Error;
    }
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

export const getUserData = async () => {
  try {
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      const docRef = doc(fs, "users", uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // get dates of specific device from db
        const device = docSnap
          .data()
          .devices.find((device) => device.activate === true);
        const dbRef = ref(db);
        if (device) {
          const dbSnapshot = await get(child(dbRef, device.name));
          if (dbSnapshot.exists()) {
            const dates = Object.keys(dbSnapshot.val());
            const storedDates = await sendDataToFirestore(dates);
            return storedDates;
          } else {
            throw Error("Didn't find device data.");
          }
        }
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
