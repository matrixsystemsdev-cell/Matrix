import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// User's web app's Firebase configuration for estatecopy-enterprise
export const firebaseConfig = {
  apiKey: "AIzaSyC6Ke6oDbCbxDHY1G6Jed2gqXtrUfLgPPQ",
  authDomain: "estatecopy-enterprise.firebaseapp.com",
  projectId: "estatecopy-enterprise",
  storageBucket: "estatecopy-enterprise.firebasestorage.app",
  messagingSenderId: "166561572743",
  appId: "1:166561572743:web:e9dd92956916d4e375d522",
  measurementId: "G-8M14LNK78R"
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Initialize Analytics safely for browser
export let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics optional in restricted or dev iframe environments
  });
}
