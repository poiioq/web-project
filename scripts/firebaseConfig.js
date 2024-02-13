// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEG7A4W6NjTiJO7wdDLBChI7tj0f7KSgQ",
  authDomain: "techsquared-e5226.firebaseapp.com",
  databaseURL: "https://techsquared-e5226-default-rtdb.firebaseio.com",
  projectId: "techsquared-e5226",
  storageBucket: "techsquared-e5226.appspot.com",
  messagingSenderId: "890994164805",
  appId: "1:890994164805:web:a90388d7b7a55643c4cf2c",
  measurementId: "G-PRT67D6YJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export {
    app,
    db
}