import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdTFeXOSrCHcJ76_IZWKDjSZmErsyEYfk",
    authDomain: "taxirate-2f843.firebaseapp.com",
    projectId: "taxirate-2f843",
    storageBucket: "taxirate-2f843.firebasestorage.app",
    messagingSenderId: "320293875416",
    appId: "1:320293875416:web:8d81e2fdd958ed2e64b1ad",
    measurementId: "G-5NLLP8WF5W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword };
