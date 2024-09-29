import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonItem,
    IonCheckbox,
    IonToolbar,
    IonButtons,
    IonBackButton
  } from '@ionic/react';
  import './Arroz_pollo_chorizo.css';
  
  const Arroz_pollo_chorizo: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
          <IonTitle>Arroz con Pollo y Chorizo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <img alt="Arroz con Pollo y Chorizo" src="Arroz_pollo_chorizo.webp" />
        <h1>Ingredientes:</h1>
        <p>1 Cucharada Aceite De Oliva</p>
        <p>1 Taza Cebolla Perla picada en cubitos</p>
        <p>2 Unidades Ajo finamente picados</p>
        <p>2 Tazas Pollo picado en cubos</p>
        <p>1/2 Taza Chorizo picado en ruedas</p>
        <p>2 Tazas Arroz blanco</p>
        <p>2 Cucharadas Vino Blanco</p>
        <p>3/4 Taza Zanahoria picada en cubos pequeños</p>
        <p>1 Taza Pimiento Rojo picado en cubitos</p>
        <p>1/2 Taza Arvejas fresca</p>
        <p>1 Cucharada MAGGI® La Rojita Puré de Tomate</p>
        <p>1 Unidad Cubito de Caldo de Gallina MAGGI®</p>
        <p>4 Tazas Agua</p>
        <h1>Preparación:</h1>
        <IonItem>
        <IonCheckbox labelPlacement="end"><b>1.</b> Coloca a calentar una olla a fuego medio. Añade el aceite y una vez caliente añade la cebolla, espera unos minutos y añade el ajo. Deja cocinar hasta que la cebolla este translúcida.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>2.</b> Añade el pollo picado, cocínalo hasta que se dore ligeramente. Una vez listo, añade el chorizo en ruedas, remueve y añade el arroz. Mezcla bien, incorporando el arroz con el resto de ingredientes. Coloca el vino blanco, (si decidiste usarlo), la zanahoria, pimientos y arveja. Integra bien.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>3.</b> Añade el Puré de tomate La Rojita MAGGI®, el caldo de gallina en cubo de 4 g MAGGI® y el agua.</IonCheckbox>
        </IonItem>

        <IonItem>
        <IonCheckbox labelPlacement="end"><b>4.</b> Cocina a fuego medio alto hasta llegar a la ebullición. Una vez que haya hervido, baja el fuego, tapa la olla y deja cocinar hasta que el arroz y los vegetales estén suaves y que el agua se haya evaporado.</IonCheckbox>
        </IonItem>
      </IonContent>
    </IonPage>
  );
  };
  
  export default Arroz_pollo_chorizo;
  