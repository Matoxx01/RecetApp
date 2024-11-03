import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";

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
        return { success: true }; // Cambiado para retornar un objeto
    } catch (error: any) { // Especificar el tipo del error
        console.error("Error durante el inicio de sesión:", error);
        return { success: false, message: error.message }; // Retornar mensaje de error
    }
}


export async function registerUser(mail: string, password: string, nick: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, mail, password);
        const user = res.user;

        await updateProfile(user, { displayName: nick });

        console.log("Usuario registrado y perfil actualizado:", res);
        return true;
    } catch (error) {
        console.error("Error durante el registro:", error);
        return false;
    }
}
export async function resetPassword(mail: string) {
    try {
        await sendPasswordResetEmail(auth, mail);
        console.log("Correo de restablecimiento de contraseña enviado.");
        return true;
    } catch (error) {
        console.error("Error al enviar el correo de restablecimiento de contraseña:", error);
        return false;
    }
}