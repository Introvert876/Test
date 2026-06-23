importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC-myKD8OsF0jbXoOntvGn9Y8PA2ixT2cQ",
  authDomain: "battleearn-9e3e1.firebaseapp.com",
  projectId: "battleearn-9e3e1",
  storageBucket: "battleearn-9e3e1.firebasestorage.app",
  messagingSenderId: "551902878243",
  appId: "1:551902878243:web:51a011d7a247eb9c976f96",
  measurementId: "G-TDDMJXVGF7"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log(
    "[firebase-messaging-sw.js] Background Message:",
    payload
  );

  const notificationTitle =
    payload.notification?.title ||
    "BattleEarn Notification";

  const notificationOptions = {
    body:
      payload.notification?.body ||
      "You received a notification.",
    icon:
      "https://firebase.google.com/favicon.ico",
    badge:
      "https://firebase.google.com/favicon.ico",
    data: payload.data || {}
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener(
  "notificationclick",
  function(event) {

    event.notification.close();

    const route =
      event.notification.data?.route;

    if (route) {

      event.waitUntil(
        clients.openWindow(route)
      );

    } else {

      event.waitUntil(
        clients.openWindow("/")
      );

    }
  }
);
