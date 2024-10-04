import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonButtons,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol
  } from '@ionic/react';
  import { person, people, home } from 'ionicons/icons';
  import './SebaN.css';
  
  const SebaN: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/Aboutus"></IonBackButton>
            </IonButtons>
            <IonTitle>Sebastian Novoa</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonBreadcrumbs>
          <IonBreadcrumb href="/home">
            Home
            <IonIcon slot="end" icon={home}></IonIcon>
          </IonBreadcrumb>
          <IonBreadcrumb href="/Aboutus">
            Sobre Nosotros
            <IonIcon slot="end" icon={people}></IonIcon>
          </IonBreadcrumb>
          <IonBreadcrumb href="/SebaN">
            Sebastian Novoa
            <IonIcon slot="end" icon={person}></IonIcon>
          </IonBreadcrumb>
        </IonBreadcrumbs>
        <IonContent className="ion-padding">

        </IonContent>
      </IonPage>
    );
  };
  
  export default SebaN;
  