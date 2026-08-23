importScripts(
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAHTX6gGorh3Flmvbw0THBfk9i7ILeZ2E4",
  authDomain: "football-pickem-1d2ab.firebaseapp.com",
  projectId: "football-pickem-1d2ab",
  storageBucket: "football-pickem-1d2ab.firebasestorage.app",
  messagingSenderId: "1065963734942",
  appId: "1:1065963734942:web:042b5fbe5082b9cd29788f",
  measurementId: "G-K8JV62VJ6P"
});

const messaging = firebase.messaging();