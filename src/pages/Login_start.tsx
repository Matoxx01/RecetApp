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
import styles from './Login_start.module.scss';
import { logInOutline, home, eye, eyeOff, at, key } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../firebase_config';
import { useAuth } from '../App';

const Login_start: React.FC = () => {
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

  async function login() {
      setBusy(true);

      if (!isValidEmail(mail)) {
          setToastMessage('El correo electrónico es inválido.');
          setShowToast(true);
          setBusy(false);
          return;
      }

      if (!mail || !password) {
          setToastMessage('La contraseña esta vacia o es incorrecta.');
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
                  <IonTitle>Login</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonLoading message="Cargando..." duration={0} isOpen={busy} />
          <IonContent scrollY={true} className="ion-padding">
              <div className={styles.loginContainer}>
                  <h2 className={styles.loginTitle}>Bienvenido</h2>

                  <IonItem>
                    <IonIcon icon={at} slot="start" />
                      <IonInput 
                          placeholder="Correo Electrónico" 
                          style={{ minHeight: 'auto', flex: '1' }}
                          onIonChange={(e: any) => setMail(e.target.value)} 
                          type="email" 
                          required 
                      />
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={key} slot="start" />
                      <IonInput 
                          placeholder="Contraseña" 
                          style={{ minHeight: 'auto', flex: '1' }}
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
                  </IonItem>
                  <center>
                    <div className={styles.registerContainer}>
                        <IonButton 
                            onClick={login} 
                            expand="block" 
                            className={styles.loginButton}
                        >
                            Iniciar Sesión
                        </IonButton>
                        <IonText>¿No tienes cuenta?</IonText>
                        <br />
                        <IonButton 
                            onClick={() => history.push("/Register_start")} 
                            className={styles.registerButton}
                        >
                            Regístrate aquí
                        </IonButton>
                        <br />
                        <IonText>¿Olvidaste tu contraseña?</IonText>
                        <IonButton 
                            onClick={() => history.push("/Reset_start")} 
                            className={styles.resetButton}
                        >
                            Restablecer Contraseña
                        </IonButton>
                    </div>
                  </center>
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

export default Login_start;