// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Initialise the Gemini Developer API backend service
const ai = getAI(app, { backend: new GoogleAIBackend() });

const model = getGenerativeModel(ai, {
  model: 'gemini-2.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
  },
});

// Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth, ai, model };
export default app;
