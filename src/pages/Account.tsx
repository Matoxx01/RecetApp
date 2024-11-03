import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonButton,
    IonInput,
    IonToolbar,
    IonItem,
    IonToast,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonLoading,
    IonText
} from '@ionic/react';
import './Account.css';
import { home, person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signOut, updateEmail, updateProfile } from 'firebase/auth';
import { useAuth } from '../App';

const Account: React.FC = () => {
    const history = useHistory();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const auth = getAuth();
    
    const [email, setEmail] = useState(auth.currentUser?.email || '');
    const [password, setPassword] = useState('');
    const [nick, setNick] = useState(auth.currentUser?.displayName || '');
    const [busy, setBusy] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleLogout = async () => {
        setBusy(true);
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            setToastMessage('Sesión cerrada con exito');
            setShowToast(true);
            history.push('/Home');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setToastMessage('Error al cerrar sesión');
            setShowToast(true);
        } finally {
            setBusy(false);
        }
    };

    const handleUpdateProfile = async () => {
        setBusy(true);
        const user = auth.currentUser;
        if (user) {
            try {
                await updateProfile(user, { displayName: nick });
                if (email !== user.email) {
                    await updateEmail(user, email);
                }
                setToastMessage('Perfil actualizado correctamente');
                setShowToast(true);
            } catch (error) {
                console.error("Error al actualizar el perfil:", error);
                setToastMessage('Error al actualizar el perfil');
                setShowToast(true);
            } finally {
                setBusy(false);
            }
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home"></IonBackButton>
                </IonButtons>
                    <IonTitle>Mi cuenta</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonBreadcrumbs>
                <IonBreadcrumb href="/home">
                    Home
                    <IonIcon slot="end" icon={home}></IonIcon>
                </IonBreadcrumb>
                <IonBreadcrumb href="/Login">
                    Mi cuenta
                    <IonIcon slot="end" icon={person}></IonIcon>
                </IonBreadcrumb>
            </IonBreadcrumbs>
            <IonLoading message="Cargando..." duration={0} isOpen={busy} />
            <IonContent className="ion-padding">
                <IonItem>
                    <IonInput 
                        placeholder="Correo Electrónico" 
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                        type="email" 
                        required 
                    />
                </IonItem>
                <IonItem>
                    <IonInput 
                        placeholder="Nuevo Apodo" 
                        value={nick}
                        onIonChange={(e) => setNick(e.detail.value!)}
                        type="text" 
                        required 
                    />
                </IonItem>
                <IonItem>
                    <IonInput 
                        placeholder="Nueva Contraseña" 
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                        type="password" 
                    />
                </IonItem>

                <IonButton onClick={handleUpdateProfile} expand="block" className="login-button">
                    Actualizar Información
                </IonButton>
                
                <IonButton onClick={handleLogout} expand="block" className="logout-button">
                    Cerrar Sesión
                </IonButton>

                <IonToast 
                    isOpen={showToast} 
                    message={toastMessage} 
                    duration={2000} 
                    onDidDismiss={() => setShowToast(false)} 
                />
            </IonContent>
        </IonPage>
    );
};

export default Account;
