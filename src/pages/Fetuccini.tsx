import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonLabel,
    IonTitle, 
    IonCard,
    IonCardContent,
    IonThumbnail,
    IonList,
    IonItem,
    IonToolbar,
    IonCheckbox,
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
        <img alt="Fetuccini Alfredo" src="Fetuccini Alfredo.webp" />
        <h1>Ingredientes:</h1>
        <p>4 Tazas Fettuccini</p>
        <p>1/4 Taza Mantequilla Con Sal picada en cubos</p>
        <p>1 Taza Crema de Leche LA LECHERA®</p>
        <p>1/2 Taza Queso Parmesano rallado</p>
        <p>2 Cucharadas Perejil Fresco picado</p>
        <p>1 Cucharadita Pimienta NATURE'S HEART® recién molida</p>
        <h1>Preparación:</h1>
        <IonItem>
        <IonCheckbox labelPlacement="end"><b>1.</b> Coloca suficiente agua en una olla para cocinar los fideos, agrega sal y lleva a hervir.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>2.</b> Una vez hirviendo añade la pasta, cocínala siguiendo las indicaciones del empaque. Prepara una sartén grande en otra hornilla a fuego medio.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>3.</b> Derrite la mantequilla en la sartén caliente, añade la Crema de Leche LA LECHERA® y baja el fuego. Deja hervir hasta que la crema se reduzca ligeramente y añade el queso parmesano.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>4.</b> Con una espátula remueve derritiendo el queso, sazona con perejil picado y Pimienta Negra recién molida NATURE'S HEART®.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>5.</b> Una vez lista la pasta, drénala y colócala sobre la salsa. Mezcla bien hasta que la salsa cubra la pasta y sirve enseguida. Decora con perejil y queso parmesano adicional.</IonCheckbox>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Fetuccini;
