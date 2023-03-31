// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getDatabase, set, get, update, remove, ref, child }
    from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCyBVOV-uzycyCz5tiZOrS5yvaW8tXVXM",
    authDomain: "techsquared-d947b.firebaseapp.com",
    databaseURL: "https://techsquared-d947b-default-rtdb.firebaseio.com",
    projectId: "techsquared-d947b",
    storageBucket: "techsquared-d947b.appspot.com",
    messagingSenderId: "275235034830",
    appId: "1:275235034830:web:e3819414b96712c507e29f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export {
    app,
    db
}