import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonButtons,
    IonBackButton
 } from '@ionic/react';
import './Fetuccini.css';

const Fetuccini: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
          <IonTitle>Fetuccini Alfredo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Este es el contenido de la receta Fetuccini Alfredo.</p>
      </IonContent>
    </IonPage>
  );
};

export default Fetuccini;
