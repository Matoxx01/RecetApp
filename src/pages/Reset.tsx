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
  import './Reset.css';
  import { refreshOutline ,logInOutline, home } from 'ionicons/icons';
  import { useHistory } from 'react-router-dom';
  
  import { useState } from 'react';
  import { resetPassword } from '../firebase_config'
  import { toast } from '../toast'
  
  const Reset: React.FC = () => {
    
    const [mail, setMail] = useState('')
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory();

    function isValidEmail(email: string) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
  }

  async function reset() {
    setBusy(true);
    if (!isValidEmail(mail)) {
        setToastMessage('El correo electrónico es inválido.');
        setShowToast(true);
        setBusy(false);
        return;
    }

    const res = await resetPassword(mail);

    if (!res.success) {
        setToastMessage(res.message || 'Error desconocido');
        setShowToast(true);
    } else {
        setToastMessage('Se ha enviado el correo de restablecimiento correctamente');
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
          <IonTitle>Restablecimiento de Contraseña</IonTitle>
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
          <IonBreadcrumb href="/Reset">
            Password Reset
            <IonIcon slot="end" icon={refreshOutline}></IonIcon>
          </IonBreadcrumb>
        </IonBreadcrumbs>
        <IonLoading message="Cargando..." duration={0} isOpen={busy} />
        <IonContent className="ion-padding">
        <div className="login-container">
          <h2 className="login-title">Restablece aquí</h2>

          <IonItem>
            <IonInput 
            placeholder="Correo Electrónico" 
            onIonChange={(e: any) => setMail(e.target.value)} type="email" required 
            />
          </IonItem>

          <IonButton onClick={reset} expand="block" className="login-button">Restablecer Contraseña</IonButton>
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
  
  export default Reset;
  