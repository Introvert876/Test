// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
  getMessaging,
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC-myKD8OsF0jbXoOntvGn9Y8PA2ixT2cQ",
  authDomain: "battleearn-9e3e1.firebaseapp.com",
  projectId: "battleearn-9e3e1",
  storageBucket: "battleearn-9e3e1.firebasestorage.app",
  messagingSenderId: "551902878243",
  appId: "1:551902878243:web:51a011d7a247eb9c976f96",
  measurementId: "G-TDDMJXVGF7"
};

// Your VAPID Key
const VAPID_KEY =
"BGTBi0XLUqT7rXcp3W4vlf1SEob5qfPTLka7TMqH8Vtwd8PggL7mHoSapoVOjJoFtfIbaZt6Xow-DO_vsdUj38U";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const messaging = getMessaging(app);

// UI Elements
const firebaseStatus =
document.getElementById("firebaseStatus");

const permissionStatus =
document.getElementById("permissionStatus");

const tokenStatus =
document.getElementById("tokenStatus");

const tokenBox =
document.getElementById("tokenBox");

const uidInput =
document.getElementById("uidInput");

const saveStatus =
document.getElementById("saveStatus");

const notificationLog =
document.getElementById("notificationLog");

const enableBtn =
document.getElementById("enableBtn");

const copyBtn =
document.getElementById("copyBtn");

const saveBtn =
document.getElementById("saveBtn");

firebaseStatus.innerHTML =
"Firebase Connected ✅";

let currentToken = "";

// Enable Notifications
enableBtn.addEventListener("click", async () => {

  try {

    const permission =
    await Notification.requestPermission();

    permissionStatus.innerHTML =
    "Permission: " + permission;

    if (permission !== "granted") {
      alert("Notification permission denied");
      return;
    }

    const token = await getToken(
      messaging,
      {
        vapidKey: VAPID_KEY
      }
    );

    if (!token) {
      alert("Failed to generate token");
      return;
    }

    currentToken = token;

    tokenBox.value = token;

    tokenStatus.innerHTML =
    "FCM Token Generated ✅";

    console.log(token);

  } catch (e) {

    console.error(e);

    tokenStatus.innerHTML =
    "Token Error ❌";

  }

});

// Copy Token
copyBtn.addEventListener("click", async () => {

  if (!currentToken) {
    alert("Generate token first");
    return;
  }

  await navigator.clipboard.writeText(
    currentToken
  );

  alert("Token copied");

});

// Save Token
saveBtn.addEventListener("click", async () => {

  try {

    const uid =
    uidInput.value.trim();

    if (!uid) {
      alert("Enter UID");
      return;
    }

    if (!currentToken) {
      alert("Generate token first");
      return;
    }

    saveStatus.innerHTML =
    "Searching user...";

    const q = query(
      collection(db, "users"),
      where("uid", "==", uid)
    );

    const snapshot =
    await getDocs(q);

    if (snapshot.empty) {

      saveStatus.innerHTML =
      "User not found ❌";

      return;
    }

    const userDoc =
    snapshot.docs[0];

    await updateDoc(
      doc(db,
      "users",
      userDoc.id),
      {
        fcmToken: currentToken,
        tokenUpdatedAt:
        new Date().toISOString()
      }
    );

    saveStatus.innerHTML =
    "Token Saved Successfully ✅";

  } catch (e) {

    console.error(e);

    saveStatus.innerHTML =
    "Save Failed ❌";

  }

});

// Foreground Notifications
onMessage(
  messaging,
  (payload) => {

    console.log(payload);

    const title =
    payload.notification?.title ||
    "Notification";

    const body =
    payload.notification?.body ||
    "";

    notificationLog.innerHTML =
    "[" +
    new Date().toLocaleTimeString() +
    "]\n" +
    title +
    "\n" +
    body +
    "\n\n" +
    notificationLog.innerHTML;

    alert(
      title +
      "\n\n" +
      body
    );

  }
);
