import React, { useState, useRef  } from 'react';
import { useAuth } from '../App';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonBreadcrumb,
  IonBreadcrumbs,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonCardContent,
  IonLabel,
  IonMenu,
  IonChip,
  IonItem,
  IonIcon,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonToolbar,
  IonSearchbar,
  IonPopover
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { home, funnelOutline } from 'ionicons/icons';
import './Home.css';

function Home() {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [showFilterPopover, setShowFilterPopover] = useState(false);

  const menuRef = useRef<HTMLIonMenuElement | null>(null);

  const recipes = [
    {
      title: 'Fetuccini Alfredo',
      image: 'Fetuccini Alfredo.webp',
      description: 'El clásico fetuccini alfredo cremosito, sencillo y muy rico. Añádele la proteína que más te guste.',
      route: '/Fetuccini',
      chips: ['Pasta', 'Cremoso', 'Rápido', 'Italiana']
    },
    {
      title: 'Langostinos en salsa de Mariscos',
      image: 'Langostinos.webp',
      description: 'Cada ingrediente de esta delicia está cargado de amor y el toque delicioso de caldos MAGGI®. Receta de nuestra consumidora Glenda Ortega.',
      route: '/Langostinos',
      chips: ['Mariscos', 'Gourmet', 'Salsa', 'Delicioso']
    },
    {
      title: 'Lasaña de Atún',
      image: 'Lasaña_atun.avif',
      description: 'Una experiencia culinaria única con el toque especial de caldos MAGGI®. Receta de nuestra consumidora Aida Naydut Benavides',
      route: '/Lasaña_atun',
      chips: ['Atún', 'Lasaña', 'Cremoso', 'Rápido']
    },
    {
      title: 'Ensalada de Col',
      image: 'Ensalada_col.webp',
      description: 'Una ensalada fresca, deliciosa y llena de sabor. Prepárala para tu familia y sorprende a todos.',
      route: '/Ensalada_col',
      chips: ['Ensalada', 'Fresco', 'Saludable', 'Vegetariano']
    },
    {
      title: 'Estofado de Pollo',
      image: 'Estofado_pollo.webp',
      description: 'Este delicioso estofado será la estrella del almuerzo, prepáralo con tus ingredientes favoritos pero el que no puede faltar es nuestro nuevo caldo de gallina en cubo 4gr. El secreto del sabor.',
      route: '/Estofado_pollo',
      chips: ['Pollo', 'Guiso', 'Sabroso', 'Tradicional']
    },
    {
      title: 'Arroz con pollo y chorizo',
      image: 'Arroz_pollo_chorizo.webp',
      description: 'Un clásico de las cocinas de mamá. Prepara este delicioso arroz con el toque secreto de caldos MAGGI®. Así como lo preparaba la abuelita!!',
      route: '/Arroz_pollo_chorizo',
      chips: ['Arroz', 'Pollo', 'Chorizo', 'Familiar']
    }
  ];

  const toggleChipFilter = (chip: string) => {
    setSelectedChips((prevSelectedChips) =>
      prevSelectedChips.includes(chip)
        ? prevSelectedChips.filter((selectedChip) => selectedChip !== chip)
        : [...prevSelectedChips, chip]
    );
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesText = recipe.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesChips = selectedChips.length === 0 || recipe.chips.some(chip => selectedChips.includes(chip));
    return matchesText && matchesChips;
  });

  const handleAccount = () => {
    menuRef.current?.close();
    history.push('/Account');
  };

  const handleLogin = () => {
    menuRef.current?.close();
    history.push('/Login');
  };

  const handleFavoritos = () => {
    menuRef.current?.close();
    history.push('/Favoritos');
  };

  const handleAddRecipe = () => {
    menuRef.current?.close();
    history.push('/Addrecipe');
  };

  const handleConfig = () => {
    menuRef.current?.close();
    history.push('/Config');
  };

  const handleAboutus = () => {
    menuRef.current?.close();
    history.push('/Aboutus');
  };

  return (
    <>
      <IonMenu ref={menuRef} contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {isLoggedIn ? (
                <IonItem button onClick={handleAccount}>
                  <IonLabel>Mi cuenta</IonLabel>
                </IonItem>
            ) : (
                <IonItem button onClick={handleLogin}>
                  <IonLabel>Login</IonLabel>
                </IonItem>
            )}
            <IonItem button onClick={handleFavoritos}>
              <IonLabel>Favoritos</IonLabel>
            </IonItem>
            <IonItem button onClick={handleAddRecipe}>
              <IonLabel>Agrega tu receta</IonLabel>
            </IonItem>
            <IonItem button onClick={handleConfig}>
              <IonLabel>Configuración</IonLabel>
            </IonItem>
            <IonItem button onClick={handleAboutus}>
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
        <IonBreadcrumbs>
          <IonBreadcrumb href="/home">
            Home
            <IonIcon slot="end" icon={home}></IonIcon>
          </IonBreadcrumb>
        </IonBreadcrumbs>
        <IonContent className="ion-padding">
          <IonToolbar>
            <IonSearchbar
              value={searchText}
              onIonInput={(e) => setSearchText(e.target.value!)}
              debounce={250}
            ></IonSearchbar>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowFilterPopover(true)}>
                <IonIcon slot="icon-only" icon={funnelOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonPopover
            isOpen={showFilterPopover}
            onDidDismiss={() => setShowFilterPopover(false)}
          >
            <IonContent className="ion-padding">
              <h3>Filtrar:</h3>
              {['Pasta', 'Cremoso', 'Rápido', 'Italiana', 'Mariscos', 'Gourmet', 'Salsa', 'Delicioso', 'Atún', 'Ensalada', 'Fresco', 'Saludable', 'Pollo', 'Sabroso', 'Tradicional', 'Chorizo', 'Familiar'].map((chip, index) => (
                <IonChip
                  key={index}
                  onClick={() => toggleChipFilter(chip)}
                  color={selectedChips.includes(chip) ? 'primary' : 'medium'}
                >
                  {chip}
                </IonChip>
              ))}
            </IonContent>
          </IonPopover>

          {filteredRecipes.map((recipe, index) => (
            <IonCard key={index} button={true} className="card-custom" onClick={() => history.push(recipe.route)}>
              <img alt={recipe.title} src={recipe.image} />
              <IonCardHeader>
                <IonCardTitle>{recipe.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {recipe.description}
                <div className="chips-container">
                  {recipe.chips.map((chip, chipIndex) => (
                    <IonChip key={chipIndex}>{chip}</IonChip>
                  ))}
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    </>
  );
}

export default Home;
