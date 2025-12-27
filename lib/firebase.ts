import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Debug check (Safe to remove after fixing)
if (typeof window !== "undefined") {
    console.log("🛠️ Firebase Debug Info:");
    console.log("- API Key (masked):", firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 7)}...` : "MISSING");
    console.log("- Project ID:", firebaseConfig.projectId || "MISSING");
    console.log("- App ID:", firebaseConfig.appId || "MISSING");
    console.log("- Auth Domain:", firebaseConfig.authDomain || "MISSING");

    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.error("❌ Critical Firebase configuration is missing! Check Vercel Env Variables.");
    }
}


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
