import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAoZAVao-kK27Jioxr6Nx1GaqGKWbqHnk0",
  authDomain: "semillero-sas.firebaseapp.com",
  projectId: "semillero-sas",
  storageBucket: "semillero-sas.appspot.com",
  messagingSenderId: "851209475032",
  appId: "1:851209475032:web:3a80ebc8ca209ce57e98ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
