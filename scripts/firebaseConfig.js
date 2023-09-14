// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-caOqiBSSt07n-02RTXng-nYxPWogIW0",
    authDomain: "techsquaredio-38ada.firebaseapp.com",
    databaseURL: "https://techsquaredio-38ada-default-rtdb.firebaseio.com",
    projectId: "techsquaredio-38ada",
    storageBucket: "techsquaredio-38ada.appspot.com",
    messagingSenderId: "735060439908",
    appId: "1:735060439908:web:58f6e7469da1a5be8b0071"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export {
    app,
    db
}