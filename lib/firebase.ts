import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBiDR_t7NYSArt69cV4dxomH9_dL6lt_o",
    authDomain: "supto-dev.firebaseapp.com",
    projectId: "supto-dev",
    storageBucket: "supto-dev.firebasestorage.app",
    messagingSenderId: "1057455148084",
    appId: "1:1057455148084:web:7e8bb86b170f8054b98e61",
    measurementId: "G-XGQW0W68MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let analytics;

if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, googleProvider, analytics };
