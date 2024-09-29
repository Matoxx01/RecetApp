import React, { useState } from 'react';
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
  IonToolbar,
  IonSearchbar 
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

function Home() {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');

  const recipes = [
    {
      title: 'Fetuccini Alfredo',
      image: 'Fetuccini Alfredo.webp',
      description: 'El clásico fetuccini alfredo cremosito, sencillo y muy rico. Añádele la proteína que más te guste.',
      route: '/Fetuccini'
    },
    {
      title: 'Langostinos en salsa de Mariscos',
      image: 'Langostinos.webp',
      description: 'Cada ingrediente de esta delicia está cargado de amor y el toque delicioso de caldos MAGGI®. Receta de nuestra consumidora Glenda Ortega.',
      route: '/Langostinos'
    },
    {
      title: 'Lasaña de Atún',
      image: 'Lasaña_atun.avif',
      description: 'Una experiencia culinaria única con el toque especial de caldos MAGGI®. Receta de nuestra consumidora Aida Naydut Benavides',
      route: '/Lasaña_atun'
    },
    {
      title: 'Ensalada de Col',
      image: 'Ensalada_col.webp',
      description: 'Una ensalada fresca, deliciosa y llena de sabor. Prepárala para tu familia y sorprende a todos.',
      route: '/Ensalada_col'
    },
    {
      title: 'Estofado de Pollo',
      image: 'Estofado_pollo.webp',
      description: 'Este delicioso estofado será la estrella del almuerzo, prepáralo con tus ingredientes favoritos pero el que no puede faltar es nuestro nuevo caldo de gallina en cubo 4gr. El secreto del sabor.',
      route: '/Estofado_pollo'
    },
    {
      title: 'Arroz con pollo y chorizo',
      image: 'Arroz_pollo_chorizo.webp',
      description: 'Un clásico de las cocinas de mamá. Prepara este delicioso arroz con el toque secreto de caldos MAGGI®. Así como lo preparaba la abuelita!!',
      route: '/Arroz_pollo_chorizo'
    }
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
            <IonTitle>RecetApp</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.target.value)}
            debounce={250}
          ></IonSearchbar>

          {filteredRecipes.map((recipe, index) => (
            <IonCard key={index} button={true} className="card-custom" onClick={() => history.push(recipe.route)}>
              <img alt={recipe.title} src={recipe.image} />
              <IonCardHeader>
                <IonCardTitle>{recipe.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{recipe.description}</IonCardContent>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    </>
  );
}

export default Home;
