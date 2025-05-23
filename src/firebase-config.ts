// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

// Use environment variables for Firebase configuration.  populate .env.local file with your own Firebase configuration
// Students will need to use their own Firebase configuration
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.error(
    'Firebase configuration is missing. Please set the environment variables. see README.md',
  );
}
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

console.table(firebaseConfig); // Simply pass the object directly
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Connect to emulators if in development mode
// This follows the approach described in the Northwestern CS 394 guide
if (import.meta.env.DEV) {
  // Connect to Firestore emulator
  connectFirestoreEmulator(db, 'localhost', 8080);
  console.warn('🔥 Using Firestore emulator. Is it running? (firebase emulators:start)');
}

export default app;
