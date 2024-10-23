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
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonButtons,
    IonBackButton
  } from '@ionic/react';
  import './Login.css';
  import { logInOutline, home } from 'ionicons/icons';
  
  const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
          <IonTitle>LogIn</IonTitle>
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
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonInput type="email" required></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" required></IonInput>
          </IonItem>

          <IonButton expand="block" className="login-button">Iniciar Sesión</IonButton>

          <div className="register-container">
            <IonText>¿No tienes cuenta?</IonText>
            <IonButton fill="clear" routerLink="/register">Regístrate aquí</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
  };
  
  export default Login;
  