import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInWithEmail = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};
