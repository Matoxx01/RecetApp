import React, { useState, useRef, useEffect } from 'react';
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
  IonSpinner,
  IonList,
  IonCardContent,
  IonRefresher,
  IonLabel,
  IonMenu,
  IonChip,
  IonItem,
  IonRefresherContent,
  IonIcon,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonToolbar,
  IonSearchbar,
  IonPopover
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { getRecipes } from '../firebase_config';
import { home, funnelOutline } from 'ionicons/icons';
import './Home.css';

function Home() {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const menuRef = useRef<HTMLIonMenuElement | null>(null);

  const handleRefresh = (event: CustomEvent) => {
    setLoading(true);
    setTimeout(async () => {
      await fetchRecipes();
      event.detail.complete();
    }, 1000);
  };

  const fetchRecipes = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Error al obtener recetas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    history.push('/Login');
  };

  const { setIsLoggedIn } = useAuth();

  const toggleChipFilter = (chip: string) => {
    setSelectedChips((prevSelectedChips) =>
      prevSelectedChips.includes(chip)
        ? prevSelectedChips.filter((selectedChip) => selectedChip !== chip)
        : [...prevSelectedChips, chip]
    );
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesText = recipe.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesChips = selectedChips.length === 0 || (recipe.chips && recipe.chips.some((chip) => selectedChips.includes(chip)));
    return matchesText && matchesChips;
  });

  interface Recipe {
    id: string;
    author: { nick: string };
    description: string;
    image: string;
    ingredients: string[];
    preparation: string[];
    title: string;
    chips?: string[];
  }  

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

  if (loading) {
    return (
      <IonContent className="loading-container">
        <IonSpinner className="loading-spinner" name="crescent" />
        <p className="loading-text">Cargando recetas...</p>
      </IonContent>
    );
  }

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
            {isLoggedIn && (
            <IonItem button onClick={handleFavoritos}>
              <IonLabel>Favoritos</IonLabel>
              </IonItem>
              )}
            {isLoggedIn && (
              <IonItem button onClick={handleAddRecipe}>
                <IonLabel>Agrega tu receta</IonLabel>
              </IonItem>
            )}
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
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent
              pullingIcon={home}
              refreshingSpinner="circles"
              pullingText="Desliza hacia abajo para actualizar"
              refreshingText="Actualizando recetas..."
            >
            </IonRefresherContent>
          </IonRefresher>
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
          <br />
          {selectedChips.map((chip, index) => (
            <IonChip
              key={index}
              color="medium"
              onClick={() => toggleChipFilter(chip)}
              >
              {chip}
              <IonIcon
                icon="close"
                slot="end"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleChipFilter(chip);
                }}
              />
            </IonChip>
          ))}

          <IonPopover
            isOpen={showFilterPopover}
            onDidDismiss={() => setShowFilterPopover(false)}
            className="center-popover"
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
            <IonCard
              key={index}
              button={true}
              className="card-custom"
              onClick={() => history.push(`/recipe/${recipe.id}`)}
            >
              <img alt={recipe.title} src={recipe.image} />
              <IonCardHeader>
                <IonLabel>{recipe.author.nick}</IonLabel>
                <IonCardTitle>{recipe.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {recipe.description}
                <div className="chips-container">
                  {Array.isArray(recipe.chips) && recipe.chips.length > 0 ? (
                    recipe.chips.map((chip, chipIndex) => (
                      <IonChip key={chipIndex}>{chip}</IonChip>
                    ))
                  ) : (
                    <IonLabel>No hay chips</IonLabel>
                  )}
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
