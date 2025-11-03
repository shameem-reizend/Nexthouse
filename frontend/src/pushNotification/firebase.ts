import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';
import { saveToken } from "../api/modules/firebase.api";

const firebaseConfig = {
  apiKey: "AIzaSyAH3zlIJWmv4kjt3haw5CEiluRItg4z8MQ",
  authDomain: "nexthouse-997e8.firebaseapp.com",
  projectId: "nexthouse-997e8",
  storageBucket: "nexthouse-997e8.firebasestorage.app",
  messagingSenderId: "98358752409",
  appId: "1:98358752409:web:14352df84ce587f06c7408",
  measurementId: "G-SLR1WLSV27"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);

  if(permission === 'granted'){
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_KEY_PAIR
    });
    console.log(token);
    try {
      const response = await saveToken(token);
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

}