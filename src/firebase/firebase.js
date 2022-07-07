import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZrSsb-dky9gJyN1TX_xv7O8FTMPZwrdE",
  authDomain: "image-spring-reddit.firebaseapp.com",
  projectId: "image-spring-reddit",
  storageBucket: "image-spring-reddit.appspot.com",
  messagingSenderId: "539198702713",
  appId: "1:539198702713:web:320fb574e99c08237680a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
