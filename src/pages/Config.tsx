import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonItem,
    IonCheckbox,
    IonToolbar,
    IonButtons,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonBackButton
  } from '@ionic/react';
  import './Config.css';
  import { cog, home } from 'ionicons/icons';
  
  const Config: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
          <IonTitle>Configuracion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/Config">
          Configuracion
          <IonIcon slot="end" icon={cog}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>
      <IonContent className="ion-padding">
        
      </IonContent>
    </IonPage>
  );
  };
  
  export default Config;
  