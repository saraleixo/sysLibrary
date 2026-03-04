import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { initializeAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-9_Gb8CqxH_PPMgQgQQp0LUDukwht4b0",
    authDomain: "bibliotecaavivamento-d0edf.firebaseapp.com",
    projectId: "bibliotecaavivamento-d0edf",
    storageBucket: "bibliotecaavivamento-d0edf.firebasestorage.app",
    messagingSenderId: "726736585501",
    appId: "1:726736585501:web:925ae52942dae68bfe57f4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app);

export { auth, db };
