import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonItem,
  IonCheckbox,
  IonBreadcrumbs,
  IonBreadcrumb,
  IonIcon,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import './Langostinos.css';
import { fastFood, home } from 'ionicons/icons';

const Langostinos: React.FC = () => {
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home"></IonBackButton>
      </IonButtons>
        <IonTitle>Langostinos en salsa de Mariscos</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/Langostinos">
          Langostinos en salsa de Mariscos
          <IonIcon slot="end" icon={fastFood}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>
    <IonContent className="ion-padding">
        <img alt="Langostinos en Salsa de Mariscos" src="Langostinos.webp" />
        <h1>Ingredientes:</h1>
        <p>• 4 Unidades Ajo</p>
        <p>• 1/2 Taza Cebollín</p>
        <p>• 1 Sobre Caldo de Gallina en polvo MAGGI ®</p>
        <p>• 4 Cucharadas Mantequilla sin sal</p>
        <p>• 10 unidades Langostino</p>
        <p>• 1 Unidad Pimiento Verde</p>
        <p>• 1 Unidad Pimiento Amarillo</p>
        <p>• 1 Unidad Pimiento Rojo</p>
        <p>• 1 Unidad Cebolla Morada</p>
        <p>• 1 Taza Cilantro</p>
        <p>• 1 taza de pulpo cocinado y picado</p>
        <p>• 1 Sobre Caldo de Gallina en polvo MAGGI ®</p>
        <p>• 3 Cucharadas Aceite de achiote</p>
        <p>• 2 Cucharadas Mostaza MAGGI®</p>
        <p>• 1 Cucharada Pimienta Negra</p>
        <p>• 2 Tazas Camarones</p>
        <p>• 1/3 Sobre Crema De Pollo MAGGI®</p>
        <p>• 1/2 Taza Crema de Leche LA LECHERA®</p>
        <p>• 1 Taza Agua</p>
        <p>• 1 Taza pulpa de choncha</p>
        <h1>Preparación:</h1>

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    1.</b> En una sartén coloca 2 cucharadas de mantequilla, una ves caliente agrega el ajo picado y el cebollín picado, sazona los langostinos con Caldo de Gallina MAGGI® y agrégalos al sartén, cocínalos hasta que estén listos y resérvalos.
        <br /><br /><br />

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    2.</b> Pica cebolla, los pimientos, ajo y cilantro, coloca en un sartén un poco de mantequilla, achiote, y los vegetales picados, añade el sobre de Caldo de Gallina MAGGI® en polvo, cocina hasta que la cebolla este translucida.
        <br /><br /><br />

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    3.</b> Sazona el pulpo y los camarones con un poco de la Mostaza MAGGI®, calienta el restante de mantequilla en una olla amplia, y añade el pulpo sazonado, el refrito, y los camarones.
        <br /><br /><br />

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    4.</b> Disuelve la crema de pollo MAGGI® en una taza de agua, añádela en la preparación y junto a la crema de leche, cocina hasta espesar ligeramente y añade las conchas.
        <br /><br /><br />

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    5.</b> Sirve en un plato acompañado de un poco de arroz, los langostinos cubiertos de la salsa de mariscos.
      </IonContent>
  </IonPage>
);
};

export default Langostinos;
