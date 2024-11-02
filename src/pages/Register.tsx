import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonButton,
    IonText,
    IonInput,
    IonToolbar,
    IonItem,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonButtons,
    IonBackButton
} from '@ionic/react';
import './Register.css';
import { logInOutline, globeOutline, home } from 'ionicons/icons';
import { useState } from 'react';
import { toast } from '../toast';
import { registerUser } from '../firebase_config';

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    async function register() {
        if(password !== confirmPassword) {
            return toast('Las contraseñas no coinciden')
        }
        if(mail.trim() === '' || password.trim() === '') {
            return toast('Se requieren Mail y Contraseña')
        }

        const res = await registerUser(mail, password)
        if(res) {
            toast('Te has registrado correctamente')
        }
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

            <IonContent className="ion-padding">
                <div className="register-container">
                    <h2 className="register-title">Crea tu cuenta</h2>
                    
                    <IonItem>
                        <IonInput 
                            placeholder="Nombres" 
                            onIonChange={(e: any) => setFirstName(e.target.value)} 
                            required 
                        />
                    </IonItem>
                    
                    <IonItem>
                        <IonInput 
                            placeholder="Apellidos" 
                            onIonChange={(e: any) => setLastName(e.target.value)} 
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
                            placeholder="Celular" 
                            onIonChange={(e: any) => setPhone(e.target.value)} 
                            type="tel"
                        />
                    </IonItem>
                    
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
                            !firstName || 
                            !lastName || 
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
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;
