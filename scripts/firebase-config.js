  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDWf4ZupSaD-GxFa7beVlaP0VYsKpH2gP4",
    authDomain: "tic-tac-toe-8b1ae.firebaseapp.com",
    projectId: "tic-tac-toe-8b1ae",
    storageBucket: "tic-tac-toe-8b1ae.appspot.com",
    messagingSenderId: "886148943852",
    appId: "1:886148943852:web:fa2e766e817d8380993ac9",
    measurementId: "G-XT5HG914Y6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const db = getFirestore(app);
