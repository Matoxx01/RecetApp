import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCY18rzCiDj7p2aDE6LZJgn8vVO4mB5jY4",
  authDomain: "resetapp-8857e.firebaseapp.com",
  projectId: "resetapp-8857e",
  storageBucket: "resetapp-8857e.firebasestorage.app",
  messagingSenderId: "314485103893",
  appId: "1:314485103893:web:48bfac17c10c6381c65d1c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export async function loginUser(mail: string, password: string) {

    try {
        const res = await signInWithEmailAndPassword(auth, mail, password);
        console.log(res);
        return true;
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        return false;
    }
}

export async function registerUser(mail: string, password: string) {

    try {
        const res = await createUserWithEmailAndPassword(auth, mail, password);
        console.log(res)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}