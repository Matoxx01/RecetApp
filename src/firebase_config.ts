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
        return { success: true };
    } catch (error: any) {
        console.error("Error durante el inicio de sesión:", error);
        if (error.code === 'auth/user-not-found') {
            return { success: false, message: 'Este mail no está registrado.' };
        }
        return { success: false, message: 'Hay un error con tu mail o contraseña.' };
    }
}



export async function registerUser(mail: string, password: string, nick: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, mail, password);
        const user = res.user;

        await updateProfile(user, { displayName: nick });
        console.log("Usuario registrado y perfil actualizado:", res);
        return { success: true };
    } catch (error: any) {
        console.error("Error durante el registro:", error);
        // Detectar si el correo ya está registrado
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, message: 'Este mail ya está registrado' };
        }
        return { success: false, message: 'Error durante el registro' };
    }
}

interface ResetPasswordResult {
    success: boolean;
    message?: string;
}

export async function resetPassword(mail: string): Promise<ResetPasswordResult> {
    try {
        await sendPasswordResetEmail(auth, mail);
        return { success: true };
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            return { success: false, message: 'Este mail no está registrado.' };
        }
        return { success: false, message: 'Hay un error con el Mail ingresado.' };
    }
}