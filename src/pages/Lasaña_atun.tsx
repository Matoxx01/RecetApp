import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Lasaña_atun.css';

const Lasaña_atun: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Welcome to Ionic React!</p>
      </IonContent>
    </IonPage>
  );
};

export default Lasaña_atun;