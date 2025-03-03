import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
    deleteUser as firebaseDeleteUser,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import firebase from 'firebase/app';
import { getDatabase } from "firebase/database";
import { ref, get, update, remove, set, push } from "firebase/database";
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

const user = auth.currentUser;
if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
}

export async function loginUser(mail: string, password: string) {
    try {
        const res = await signInWithEmailAndPassword(auth, mail, password);
        console.log("Usuario autenticado correctamente:", res.user);
        return { success: true, uid: res.user?.uid  };
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

// Define y exporta el tipo LoginResponse
export type LoginResponse = {
    success: boolean;
    uid?: string; // uid es opcional porque solo estará presente si success es true
    message?: string; // message es opcional porque solo estará presente si success es false
};

export async function loginWithGoogle(): Promise<LoginResponse> {
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("Usuario autenticado con Google:", user);

        // Guardar el estado de login en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.displayName || 'Usuario');
        localStorage.setItem('uid', user.uid || 'No hay uid');

        // Devolver el objeto con success y uid
        return { 
            success: true, 
            uid: user.uid // Devuelve el uid del usuario
        };
    } catch (error) {
        console.error("Error en loginWithGoogle:", error);
        return { 
            success: false, 
            message: 'Error al iniciar sesión con Google.' 
        };
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
      servings: recipe.servings
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

export const deleteRecipe = async (recipeId: string) => {
    try {
        const recipeRef = ref(database, 'recetas/' + recipeId);
        await remove(recipeRef);
        console.log("Receta eliminada de Firebase");
    } catch (error) {
        console.error("Error al eliminar la receta de Firebase:", error);
        throw new Error("No se pudo eliminar la receta.");
    }
};

export async function toggleFavorite(uid: string, recipeId: string, isFavorite: boolean) {
    console.log(`Toggling favorite for user: ${uid}, recipe: ${recipeId}, already favorite: ${isFavorite}`);
    const db = getDatabase();
    const favoriteRef = ref(getDatabase(), `likes&favs/${uid}/favorites/${recipeId}`);
    
    if (isFavorite) {
      // Si ya está en favoritos, eliminarlo
      console.log("Removing from favorites...");
      await remove(favoriteRef);
      console.log("Successfully removed from favorites");
    } else {
      // Si no está en favoritos, agregarlo
      console.log("Adding to favorites...");
      await set(favoriteRef, { recipeId });
      console.log("Successfully added to favorites");
    }
};
  
  // Obtener favoritos de un usuario
  export async function getFavorites(uid: string) {
    const db = getDatabase();
    const favoriteRef = ref(getDatabase(), `likes&favs/${uid}/favorites`);
    const snapshot = await get(favoriteRef);
    const data = snapshot.val();
    return snapshot.exists() ? Object.keys(snapshot.val()) : [];
    return data ? Object.keys(data) : [];
};

export async function toggleLikes(uid: string, recipeId: string, isLiked: boolean) {
    const likeRef = ref(database, `likes&favs/${uid}/likes/${recipeId}`);
    
    if (isLiked) {
        // Eliminar el "like" de la receta
        await remove(likeRef);
    } else {
        // Agregar el "like" a la receta
        await set(likeRef, true);
    }
}

export async function getLikes(uid: string, recipeId: string) {
    const likeRef = ref(database, `likes&favs/${uid}/likes/${recipeId}`);
    const snapshot = await get(likeRef);
    return snapshot.exists();
}

export const sendNotificationToAuthor = async (authorUid: string, notification: { message: string; timestamp: number }) => {
    try {
      const notificationsRef = ref(database, `notifications/${authorUid}`);
      await push(notificationsRef, notification);
      console.log("Notificación enviada exitosamente");
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
    }
  };

export { database, auth };