import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonButton,
    IonText,
    IonInput,
    IonToolbar,
    IonLoading,
    IonItem,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonToast
} from '@ionic/react';
import './Register.css';
import { logInOutline, globeOutline, home } from 'ionicons/icons';
import { useState } from 'react';
import { registerUser } from '../firebase_config';

const Register: React.FC = () => {
    const [nick, setNick] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [busy, setBusy] = useState<boolean>(false)

    async function register() {
        setBusy(true);
        if (password !== confirmPassword) {
            setToastMessage('Las contraseñas no coinciden');
            setShowToast(true);
            setBusy(false);
            return;
        }
        if (mail.trim() === '' || password.trim() === '') {
            setToastMessage('Se requieren Mail y Contraseña');
            setShowToast(true);
            setBusy(false);
            return;
        }
    
        const res = await registerUser(mail, password, nick);
        if (res) {
            setToastMessage('Te has registrado correctamente');
            setShowToast(true);
        }
        setBusy(false);
    }
    

    const validateEmail = (email: string) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setEmailError(isValid ? '' : 'Ingrese un correo electrónico válido.');
        return isValid;
    };

    const validatePassword = (password: string) => {
        const isValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
        setPasswordError(isValid ? '' : 'La contraseña debe tener 8 caracteres, 1 mayúscula y 1 número.');
        return isValid;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonBreadcrumbs>
                <IonBreadcrumb href="/home">
                    Home
                    <IonIcon slot="end" icon={home}></IonIcon>
                </IonBreadcrumb>
                <IonBreadcrumb href="/Login">
                    Login
                    <IonIcon slot="end" icon={logInOutline}></IonIcon>
                </IonBreadcrumb>
                <IonBreadcrumb href="/Register">
                    Registro
                    <IonIcon slot="end" icon={globeOutline}></IonIcon>
                </IonBreadcrumb>
            </IonBreadcrumbs>
            <IonLoading message="Cargando..." duration={0} isOpen={busy} />

            <IonContent className="ion-padding">
                <div className="register-container">
                    <h2 className="register-title">Crea tu cuenta</h2>
                    
                    <IonItem>
                        <IonInput 
                            placeholder="Nickname" 
                            onIonChange={(e: any) => setNick(e.target.value)} 
                            required 
                        />
                    </IonItem>
                    
                    <IonItem>
                        <IonInput 
                            placeholder="Correo Electrónico" 
                            onIonChange={(e: any) => {
                                const newEmail = e.target.value;
                                setMail(newEmail);
                                validateEmail(newEmail);
                            }} 
                            type="email" 
                            required 
                        />
                    </IonItem>
                    {emailError && <IonText color="danger" className="email-error">{emailError}</IonText>}
                    
                    <IonItem>
                        <IonInput 
                            placeholder="Contraseña" 
                            onIonChange={(e: any) => {
                                const newPassword = e.target.value;
                                setPassword(newPassword);
                                validatePassword(newPassword);
                            }} 
                            type="password" 
                            required 
                        />
                    </IonItem>
                    {passwordError && <IonText color="danger" className="password-error">{passwordError}</IonText>}
                    <IonText color="medium" className="password-hint">
                        La contraseña debe tener 8 caracteres, 1 mayúscula y 1 número.
                    </IonText>

                    <IonItem>
                        <IonInput 
                            placeholder="Confirmar Contraseña" 
                            onIonChange={(e: any) => setConfirmPassword(e.target.value)} 
                            type="password" 
                            required 
                        />
                    </IonItem>
                    {password !== confirmPassword && confirmPassword && (
                        <IonText color="danger" className="password-error">Las contraseñas no coinciden.</IonText>
                    )}

                    <IonButton
                        expand="block" 
                        className="register-button" 
                        onClick={register}
                        disabled={
                            !nick ||
                            !mail || 
                            !password || 
                            !confirmPassword || 
                            passwordError !== '' || 
                            emailError !== '' || 
                            password !== confirmPassword
                        }
                    >
                        Registrarse
                    </IonButton>
                    <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={2000}
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;
