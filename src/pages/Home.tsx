import {
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonCardContent,
  IonLabel,
  IonMenu,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonToolbar
 } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

function Home() {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem button>
              <IonLabel>Iniciar sesión</IonLabel>
            </IonItem>
            <IonItem button>
              <IonLabel>Configuración</IonLabel>
            </IonItem>
            <IonItem button>
              <IonLabel>Sobre Nosotros</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>ResetApp</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard button={true} className="card-custom">
            <img alt="Fetuccini Alfredo" src="Fetuccini Alfredo.webp" />
            <IonCardHeader>
              <IonCardTitle>Fetuccini Alfredo</IonCardTitle>
            </IonCardHeader>
              <IonCardContent>El clásico fetuccini alfredo cremosito, sencillo y muy rico. Añádele la proteína que más te guste.</IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
