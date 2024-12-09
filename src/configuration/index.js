import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4v__zRnElDhXokzqKpOYOHaMdHkGQd1o",
    authDomain: "fir-6e3d6.firebaseapp.com",
    projectId: "fir-6e3d6",
    storageBucket: "fir-6e3d6.firebasestorage.app",
    messagingSenderId: "574965220971",
    appId: "1:574965220971:web:f0ac5da265e19c29ead32e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;