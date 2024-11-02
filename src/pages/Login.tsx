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
    IonBackButton
  } from '@ionic/react';
  import './Login.css';
  import { logInOutline, home } from 'ionicons/icons';
  import { useHistory } from 'react-router-dom';
  import { useState } from 'react';
  import { loginUser } from '../firebase_config'
  import { toast } from '../toast'
  
  const Login: React.FC = () => {
    const history = useHistory();
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    function isValidEmail(email: string) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
  }

  async function login() {
      if (!isValidEmail(mail)) {
          toast('El correo electrónico es inválido.');
          return;
      }

      if (!mail || !password) {
          toast('Por favor, completa todos los campos.');
          return;
      }

      const res = await loginUser(mail, password);
      if (!res) {
          toast('Hay un error con tu Mail o Contraseña');
      } else {
          toast('Has accedido!');
      }
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
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
  };
  
  export default Login;
  