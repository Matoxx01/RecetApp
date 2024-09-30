import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonItem,
  IonCheckbox,
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBreadcrumbs,
  IonBreadcrumb,
  IonIcon,
  IonBackButton
} from '@ionic/react';
import './Lasaña_atun.css';
import { fastFood, home } from 'ionicons/icons';

const Lasaña_atun: React.FC = () => {
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home"></IonBackButton>
      </IonButtons>
        <IonTitle>Lasaña de Atun</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/Lasaña_atun">
          Lasaña de Atún
          <IonIcon slot="end" icon={fastFood}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>
    <IonContent className="ion-padding">
        <img alt="Lasaña de Atún" src="Lasaña_atun.avif" />
        <h1>Ingredientes:</h1>
        <p>4 Unidades Pimiento Verde</p>
        <p>4 Unidades Tomate pelados</p>
        <p>1 paquete Fideos para lasaña</p>
        <p>5 Cucharadas Mantequilla sin sal</p>
        <p>1 unidad Caldo de gallina en cubo MAGGI ®</p>
        <p>1 Cucharada Sal</p>
        <p>4 Unidades Cebolla Morada</p>
        <p>1 Cucharada Pimienta Negra</p>
        <p>1 Sobre Criollita MAGGI®</p>
        <p>3 Unidades Hoja De Laurel</p>
        <p>1 Taza Leche Entera LA LECHERA®</p>
        <p>1 Lata Atún escurrido</p>
        <p>1/4 Taza Queso Parmesano</p>
        <p>1/4 Taza Maicena</p>
        <p>500 gramos Queso Mozzarella</p>
        <p>2 Cucharadas Aceite de achiote</p>
        <h1>Preparación:</h1>
        <IonItem>
        <IonCheckbox labelPlacement="end"><b>1.</b> Cocine los fideos en abundante agua, cuando estén casi listo retíralos y colócalos en agua fría.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>2.</b> En un sartén grande coloca 3 cucharadas de mantequilla 2 cucharadas de aceite de achiote, y una ves caliente añade el cubo de Caldo de Gallina MAGGI® , una ves disuelto añade, cebolla, pimiento, tomate y cocina a fuego medio. Remueve constantemente y añade las hojas de laurel. la sal, la pimienta y el atún.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>3.</b> En una olla coloca mantequilla, Caldo Criollita MAGGI®.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>4.</b> Por aparte disuelve la maicena en una taza de Leche entera LA LECHERA® y llévala a calentar en la olla a fuego medio hasta que espese ligeramente, continua añadiendo el queso parmesano y reserva.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>5.</b> Engrasa un molde apto para horno, y coloca una capa de los fideos para lasaña reservados, cúbrelos con una capa del relleno de atún, coloca rodajas de queso mozzarella sobre el relleno, y cúbrelo con la salsa blanca, repite el proceso hasta terminar los ingredientes, lleva al horno cubierto de papel aluminio durante 15 minutos, retira el papel aluminio y deja dorar por 15 minutos adicionales, retira del horno y disfruta.</IonCheckbox>
        </IonItem>
      </IonContent>
  </IonPage>
);
};

export default Lasaña_atun;
