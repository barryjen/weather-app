import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxANVPOc9c_Q81fiy64B1SEmo5ZR9sEfc",
  authDomain: "weather-app-dc7fa.firebaseapp.com",
  projectId: "weather-app-dc7fa",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInWithEmail = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};
