import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonItem,
    IonCheckbox,
    IonTitle, 
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonToolbar,
    IonButtons,
    IonBackButton
  } from '@ionic/react';
  import './Estofado_pollo.css';
  import { fastFood, home } from 'ionicons/icons';
  
  const Estofado_pollo: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
          <IonTitle>Estofado de Pollo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/Estofado_pollo">
          Estofado de Pollo
          <IonIcon slot="end" icon={fastFood}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>
      <IonContent className="ion-padding">
        <img alt="Estofado de Pollo" src="Estofado_pollo.webp" />
        <h1>Ingredientes:</h1>
        <p>• 4 unidades piernas de pollo</p>
        <p>• 1/2 Cucharadita Sal</p>
        <p>• 2 unidades Caldo de gallina en cubito 4 g</p>
        <p>• 1 Unidad Ajo picado triturado</p>
        <p>• 3 cucharadas Puré de tomate LA ROJITA MAGGI(r)</p>
        <p>• 2 Unidades Tomate picado en cubitos pequeños</p>
        <p>• 2 Unidades Papas cortadas en trozos medianos</p>
        <p>• 1/2 Taza Arvejas cocidas</p>
        <p>• 1/2 Taza Zanahoria cortada en rodajas</p>
        <p>• 1/4 Taza Aceite Vegetal Girasol</p>
        <p>• 2 Tazas Agua</p>
        <p>• 1 Pizca Pimienta Negra</p>
        <p>• 1 Unidad Hoja De Laurel</p>
        <h1>Preparación:</h1>

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    1.</b> Salpimente las presas de pollo. Calienta el aceite en una olla y fríe las presas ligeramente hasta dorarlas un poco. Retíralas y escurre el exceso de aceite.
        <br /><br /><br />

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    2.</b> En la misma olla donde se doró el pollo, a fuego medio bajo, coloca la cebolla junto con el ajo. Una vez sofrito, añade los caldos de gallina en cubo de 4 gramos MAGGI®, 3 cucharadas de Puré la Rojita MAGGI® y los tomates. Cocina por 5 minutos.
        <br /><br /><br />

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    3.</b> Regresa las presas de pollo a la olla donde preparaste el refrito, agrega 2 tazas de agua y cocina por 5 minutos.
        <br /><br /><br />

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    4.</b> Agrega las arvejas, las zanahorias, la hoja de laurel y las papas cortadas por la mitad. Cocina por 10 minutos más a fuego medio hasta obtener una textura espesa. Asegúrate de que las papas se hayan cocinado.
        <br /><br /><br />

        <IonCheckbox labelPlacement="end"></IonCheckbox><b>    5.</b> Una vez listo, retira la hoja de laurel y sirve acompañado de una porción de arroz.
      </IonContent>
    </IonPage>
  );
  };
  
  export default Estofado_pollo;
  