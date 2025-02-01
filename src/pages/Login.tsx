import {  
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonButton,
    IonLabel,
    IonText,
    IonInput,
    IonToolbar,
    IonItem,
    IonCheckbox,
    IonToast,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonLoading
  } from '@ionic/react';
  import styles from './Login.module.scss';
  import { logInOutline, home, eye, eyeOff, at, key, logoGoogle } from 'ionicons/icons'; // Importar logoGoogle
  import { useHistory } from 'react-router-dom';
  import { useState } from 'react';
  import { loginUser, loginWithGoogle, LoginResponse } from '../firebase_config';
  import { useAuth } from '../App';
  
  const Login: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);
    const { setUser, setIsLoggedIn } = useAuth();
    const history = useHistory();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    function isValidEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async function loginWithGoogleHandler() {
        setBusy(true); // Activar el estado de carga

        try {
            // Llamar a la función de autenticación con Google
            const res: LoginResponse = await loginWithGoogle(); // Aquí especificamos el tipo de res

            if (res.success && res.uid) { // Verificar si la autenticación fue exitosa
                setToastMessage('Has accedido con Google!');
                setShowToast(true);

                // Actualizar el estado de autenticación en la aplicación
                setIsLoggedIn(true);
                setUser({ uid: res.uid, email: '' }); // El email no es necesario aquí

                // Guardar el estado de autenticación en localStorage
                localStorage.setItem('user', JSON.stringify({ 
                    uid: res.uid, 
                    email: '' // El email no es necesario aquí
                }));

                // Redirigir al usuario a la página de inicio
                history.push('/home');
            } else {
                // Mostrar un mensaje de error si la autenticación falla
                setToastMessage(res.message || 'Error al iniciar sesión con Google.');
                setShowToast(true);
            }
        } catch (error) {
            // Manejar errores inesperados
            console.error("Error en loginWithGoogle:", error);
            setToastMessage('Ocurrió un error inesperado al iniciar sesión con Google.');
            setShowToast(true);
        } finally {
            setBusy(false); // Desactivar el estado de carga
        }
    }

    async function login() {
        setBusy(true);
  
        if (!isValidEmail(mail)) {
            setToastMessage('El correo electrónico es inválido.');
            setShowToast(true);
            setBusy(false);
            return;
        }
  
        if (!mail || !password) {
            setToastMessage('La contraseña está vacía o es incorrecta.');
            setShowToast(true);
            setBusy(false);
            return;
        }
  
        const res = await loginUser(mail, password);
  
        if (res.success && res.uid) { // Verifica si res.uid existe
            setToastMessage('Has accedido!');
            setShowToast(true);
  
            setIsLoggedIn(true);
            setUser({ uid: res.uid, email: mail });
  
            localStorage.setItem('user', JSON.stringify({ uid: res.uid, email: mail }));
  
            history.push('/home');
        } else {
            setToastMessage(res.message || 'Hay un error con tu mail o contraseña');
            setShowToast(true);
        }
  
        setBusy(false);
    }
  
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
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
            </IonBreadcrumbs>
            <IonLoading message="Cargando..." duration={0} isOpen={busy} />
            <IonContent scrollY={true} className="ion-padding">
                <div className={styles.form}>
                    <div className={styles.flexColumn}>
                        <label>Correo</label>
                    </div>
                    <div className={styles.inputForm}>
                        <IonIcon icon={at} slot="start" />
                        <IonInput 
                            placeholder="Correo Electrónico" 
                            style={{ '--border-color': 'transparent' }}
                            fill="outline"
                            onIonChange={(e: any) => setMail(e.target.value)} 
                            type="email" 
                            required 
                        />
                    </div>
  
                    <div className={styles.flexColumn}>
                        <label>Contraseña</label>
                    </div>
                    <div className={styles.inputForm}>
                        <IonIcon icon={key} slot="start" />
                        <IonInput 
                            placeholder="Contraseña"
                            style={{ '--border-color': 'transparent' }}
                            fill="outline"
                            onIonChange={(e: any) => setPassword(e.target.value)} 
                            type={showPassword ? 'text' : 'password'} 
                            required 
                        />
                        <IonIcon 
                            icon={showPassword ? eyeOff : eye}
                            slot="end" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className={styles.passwordIcon} 
                        />
                    </div>
  
                    <div className={styles.flexRow}>
                        <span className={styles.span} onClick={() => history.push("/Reset")}>Olvidaste tu contraseña?</span>
                    </div>
  
                    <IonButton 
                        onClick={login} 
                        expand="block" 
                        className={styles.buttonSubmit}
                    >
                        Iniciar Sesión
                    </IonButton>
  
                    <p className={styles.p}>¿No tienes cuenta? <span className={styles.span} onClick={() => history.push("/Register")}>Regístrate aquí</span></p>
  
                    <p className={`${styles.p} ${styles.line}`}>O con</p>
  
                    <div className={styles.flexRow}>
                        <IonButton 
                            fill="outline" 
                            onClick={loginWithGoogleHandler} 
                            className={`${styles.btn} ${styles.google}`}
                        >
                            <IonIcon icon={logoGoogle} slot="start" /> {/* Icono de Google */}
                            Ingresar con Google
                        </IonButton>
                    </div>
                </div>
            </IonContent>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={2000}
            />
        </IonPage>
    );
  };
  
  export default Login;