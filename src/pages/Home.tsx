import {
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonSegment,
  IonSegmentButton,
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
import { useHistory } from 'react-router-dom';
import './Home.css';

function Home() {
  const history = useHistory();
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
              <IonLabel>Favoritos</IonLabel>
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
          <IonCard button={true} className="card-custom" onClick={() => history.push('/Fetuccini')}>
            <img alt="Fetuccini Alfredo" src="Fetuccini Alfredo.webp" />
            <IonCardHeader>
              <IonCardTitle>Fetuccini Alfredo</IonCardTitle>
            </IonCardHeader>
              <IonCardContent>El clásico fetuccini alfredo cremosito, sencillo y muy rico. Añádele la proteína que más te guste.</IonCardContent>
          </IonCard>
          <IonCard button={true} className="card-custom">
            <img alt="Langostinos" src="Langostinos.webp" />
            <IonCardHeader>
              <IonCardTitle>Langostinos en salsa de Mariscos</IonCardTitle>
            </IonCardHeader>
              <IonCardContent>Cada ingrediente de esta delicia esta cargado de amor y el toque delicioso de caldos MAGGI®. Receta de nuestra consumidora Glenda Ortega.</IonCardContent>
          </IonCard>
          <IonCard button={true} className="card-custom">
            <img alt="Lasaña_atún" src="Lasaña_atun.avif" />
            <IonCardHeader>
              <IonCardTitle>Lasaña de atún</IonCardTitle>
            </IonCardHeader>
              <IonCardContent>Una experiencia culinaria única con el toce especial de caldos MAGGI®. Receta de nuestra consumidora Aida Naydut Benavides</IonCardContent>
          </IonCard>
          <IonCard button={true} className="card-custom">
            <img alt="Ensalada_col" src="Ensalada_col.webp" />
            <IonCardHeader>
              <IonCardTitle>Ensalada de col</IonCardTitle>
            </IonCardHeader>
              <IonCardContent>Una ensalada fresca, deliciosa y llena de sabor. Prepárala para tu familia y sorprende a todos.</IonCardContent>
          </IonCard>
          <IonCard button={true} className="card-custom">
            <img alt="Estofado_pollo" src="Estofado_pollo.webp" />
            <IonCardHeader>
              <IonCardTitle>Estofado de Pollo</IonCardTitle>
            </IonCardHeader>
              <IonCardContent>Este delicioso estofado será la estrella del almuerzo, prepáralo con tus ingredientes favoritos pero el que no puede faltar es nuestro nuevo caldo de gallina en cubo 4gr. El secreto del sabor.</IonCardContent>
          </IonCard>
          <IonCard button={true} className="card-custom">
            <img alt="Arroz_pollo_chorizo" src="Arroz_pollo_chorizo.webp" />
            <IonCardHeader>
              <IonCardTitle>Arroz con pollo y chorizo</IonCardTitle>
            </IonCardHeader>
              <IonCardContent>Un clasico de las cocinas de mama. Prepara este delicioso arroz con el toque secreto de caldos MAGGI®. Asi como lo preparaba la abuelita!!</IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
