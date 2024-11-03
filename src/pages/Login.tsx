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
  import './Login.css';
  import { logInOutline, home } from 'ionicons/icons';
  import { useHistory } from 'react-router-dom';
  import { useState } from 'react';
  import { loginUser } from '../firebase_config'
  import { toast } from '../toast'
  
  const Login: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)

    const history = useHistory();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    function isValidEmail(email: string) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
  }

  async function login() {
      setBusy(true)
      if (!isValidEmail(mail)) {
          setToastMessage('El correo electrónico es inválido.');
          setShowToast(true);
          setBusy(false);
          return;
      }

      if (!mail || !password) {
          setToastMessage('Por favor, completa todos los campos.');
          setShowToast(true);
          setBusy(false);
          return;
      }

      const res = await loginUser(mail, password);
      if (!res) {
          setToastMessage('Hay un error con tu mail o contraseña');
          setShowToast(true);
          setBusy(false);
      } else {
        setToastMessage('Has accedido!');
        setShowToast(true);
        setBusy(false);
      }
      setBusy(false)
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
        <IonContent className="ion-padding">
        <div className="login-container">
          <h2 className="login-title">Bienvenido</h2>

          <IonItem>
            <IonInput 
            placeholder="Correo Electrónico" 
            onIonChange={(e: any) => setMail(e.target.value)} type="email" required 
            />
          </IonItem>

          <IonItem>
            <IonInput 
            placeholder="Contraseña" 
            onIonChange={(e: any) => setPassword(e.target.value)} type="password" required 
            />
          </IonItem>

          <IonButton onClick={login} expand="block" className="login-button">Iniciar Sesión</IonButton>

          <div className="register-container">
            <IonText>¿No tienes cuenta?</IonText>
            <IonButton fill="clear" onClick={() => history.push("/Register")} >Regístrate aquí</IonButton>
            <IonText>¿Olvidaste tu contraseña?</IonText>
            <IonButton fill="clear" onClick={() => history.push("/Reset")} >Restablecer Contraseña</IonButton>
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
  