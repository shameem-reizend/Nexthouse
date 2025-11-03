// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAH3zlIJWmv4kjt3haw5CEiluRItg4z8MQ",
  authDomain: "nexthouse-997e8.firebaseapp.com",
  projectId: "nexthouse-997e8",
  storageBucket: "nexthouse-997e8.firebasestorage.app",
  messagingSenderId: "98358752409",
  appId: "1:98358752409:web:14352df84ce587f06c7408",
  measurementId: "G-SLR1WLSV27"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
