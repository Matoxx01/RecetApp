import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    deleteUser as firebaseDeleteUser,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import firebase from 'firebase/app';
import { getDatabase } from "firebase/database";
import { ref, get } from "firebase/database";
import 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyCY18rzCiDj7p2aDE6LZJgn8vVO4mB5jY4",
  authDomain: "resetapp-8857e.firebaseapp.com",
  databaseURL:"https://resetapp-8857e-default-rtdb.firebaseio.com/",
  projectId: "resetapp-8857e",
  storageBucket: "resetapp-8857e.firebasestorage.app",
  messagingSenderId: "314485103893",
  appId: "1:314485103893:web:48bfac17c10c6381c65d1c"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

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

export async function getRecipes() {
    const dbRef = ref(database, 'recetas');
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        return data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    } else {
        console.log("No hay recetas disponibles");
        return [];
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

export async function deleteUserAccount(user: any) {
    try {
        await firebaseDeleteUser(user);
        return { success: true };
    } catch (error: any) {
        console.error("Error al eliminar la cuenta:", error);
        return { success: false, message: 'No se pudo eliminar la cuenta.' };
    }
}


export { database, auth };