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
import { ref, get, update } from "firebase/database";
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
        console.log("Usuario autenticado correctamente:", res.user);
        return { success: true };
    } catch (error: any) {
        console.error("Error en loginUser:", error);
        let message = 'Hay un error con tu mail o contraseña.';
        if (error.code === 'auth/user-not-found') {
            message = 'Este mail no está registrado.';
        } else if (error.code === 'auth/wrong-password') {
            message = 'Contraseña incorrecta.';
        } else if (error.code === 'auth/invalid-email') {
            message = 'El correo electrónico es inválido.';
        }
        return { success: false, message };
    }
}

export const updateRecipe = async (id: string, recipe: any) => {
    const recipeRef = ref(database, 'recetas/' + id);
    await update(recipeRef, {
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      chips: recipe.chips,
      image: recipe.image,
    });
};

export async function updateLikeCount(recipeId: string, newLikeCount: number) {
    try {
        console.log(`Actualizando likes de la receta ${recipeId} a ${newLikeCount}`);
        const recipeRef = ref(database, 'recetas/' + recipeId);
        await update(recipeRef, {
            likes: newLikeCount,
        });
        console.log("Likes actualizados correctamente.");
    } catch (error) {
        console.error("Error al actualizar el contador de likes en Firebase:", error);
    }
}

export async function getRecipes() {
    const dbRef = ref(database, 'recetas');
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Datos de recetas obtenidos:", data);
        return data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    } else {
        console.log("No se encontraron recetas en la base de datos.");
        return [];
    }
}

export async function registerUser(mail: string, password: string, nick: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, mail, password);
        const user = res.user;
        console.log("Usuario registrado correctamente:", user);
        await updateProfile(user, { displayName: nick });
        return { success: true };
    } catch (error: any) {
        console.error("Error en registerUser:", error);
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, message: 'Este mail ya está registrado' };
        }
        return { success: false, message: 'Error durante el registro' };
    }
}

export async function resetPassword(mail: string) {
    try {
        console.log("Enviando correo de restablecimiento a:", mail);
        await sendPasswordResetEmail(auth, mail);
        console.log("Correo de restablecimiento enviado.");
        return { success: true };
    } catch (error: any) {
        console.error("Error en resetPassword:", error);
        if (error.code === 'auth/user-not-found') {
            return { success: false, message: 'Este mail no está registrado.' };
        }
        return { success: false, message: 'Hay un error con el Mail ingresado.' };
    }
}

export async function deleteUserAccount(user: any) {
    try {
        console.log("Eliminando cuenta del usuario:", user);
        await firebaseDeleteUser(user);
        console.log("Cuenta eliminada correctamente.");
        return { success: true };
    } catch (error: any) {
        console.error("Error al eliminar la cuenta:", error);
        return { success: false, message: 'No se pudo eliminar la cuenta.' };
    }
}

export { database, auth };