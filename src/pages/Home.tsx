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
import { home, funnelOutline, heart, heartOutline, arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
import styles from './Home.module.scss';

function Home() {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const menuRef = useRef<HTMLIonMenuElement | null>(null);

  const handleRefresh = (event: CustomEvent) => {
    setLoading(true);
    setTimeout(async () => {
      await fetchRecipes();
      event.detail.complete();
    }, 1000);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const toggleFavorite = (recipeId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(recipeId)
        ? prevFavorites.filter((id) => id !== recipeId)
        : [...prevFavorites, recipeId]
    );
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

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
  
  const displayedRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredRecipes.length / recipesPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  interface Recipe {
    id: string;
    author: string;
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

  const handleMyrecipes = () => {
    menuRef.current?.close();
    history.push('/Myrecipes');
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className={`${styles.loadingContainer}`} fullscreen>
          <div className={`${styles.loadingContainer}`}>
            <IonSpinner name="crescent" className={`${styles.loadingSpinner}`} />
            <p className={`${styles.loadingText}`}>Cargando recetas...</p>
          </div>
        </IonContent>
      </IonPage>
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
            {isLoggedIn && (
            <IonItem button onClick={handleMyrecipes}>
              <IonLabel>Mis recetas</IonLabel>
              </IonItem>
              )}
            <IonItem button onClick={handleConfig}>
              <IonLabel>Configuración (no disponible todavía)</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar className={styles.headerToolbar}>
            <IonButtons slot="start">
              <IonMenuButton className={styles.menuButton} />
            </IonButtons>
            <IonTitle className={styles.title}>RecetApp</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className={`${styles.pageContent}`} fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent
              pullingIcon={home}
              refreshingSpinner="circles"
              pullingText="Desliza hacia abajo para actualizar"
              refreshingText="Actualizando recetas..."
            >
            </IonRefresherContent>
          </IonRefresher>
          <IonToolbar className={styles.searchBarContainer}>
            <IonSearchbar
              value={searchText}
              onIonInput={(e) => setSearchText(e.target.value!)}
              debounce={250}
              className={styles.searchBar}
            ></IonSearchbar>
            <IonButtons slot="end">
              <IonButton
                onClick={() => setShowFilterPopover(true)}
                className={styles.filterButton}
                >
                <IonIcon slot="icon-only" icon={funnelOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <br />
          <div className={styles.chipContainer}>
            {selectedChips.map((chip, index) => (
              <IonChip
                key={index}
                outline={true}
                color="medium"
                className={styles.chip}
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
          </div>

          <IonPopover
            isOpen={showFilterPopover}
            onDidDismiss={() => setShowFilterPopover(false)}
            className="center-popover"
            >
            <IonContent className="ion-padding">
              <center><h3>Filtrado</h3></center>
              {['Pescados', 'Pollo', 'Carne', 'Legumbre', 'Mariscos', 'Entrada', 'Plato Principal', 'Salsas', 'Dulces', 'Bebidas', 'Vegetariano', 'Vegano', 'Navidad', 'Cumpleaños' ].map((chip, index) => (
                <IonChip
                  outline={true}
                  key={index}
                  className={styles.chip}
                  onClick={() => toggleChipFilter(chip)}
                  color={selectedChips.includes(chip) ? 'primary' : 'medium'}
                >
                  {chip}
                </IonChip>
              ))}
            </IonContent>
          </IonPopover>
          
          <div className={styles.recipeContainer}></div>
          {displayedRecipes.map((recipe) => (
            <IonCard
              key={recipe.id} 
              onClick={() => history.push(`/recipe/${recipe.id}`)}
              className={styles.recipeCard}
              >
              {isLoggedIn && (
                <IonButton
                  fill="clear"
                  className={`favorite-button ${isFavorite(recipe.id) ? 'favorite' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                >
                  <IonIcon icon={isFavorite(recipe.id) ? heart : heartOutline}></IonIcon>
                </IonButton>
              )}
              <img alt={recipe.title} src={recipe.image} className={styles.recipeImage} />
              <IonCardHeader className={styles.cardHeader}>
                <IonCardTitle className={styles.cardTitle}><b>{recipe.title}</b></IonCardTitle>
              </IonCardHeader>
            </IonCard>
          ))}

          <div className={styles.paginationContainer}>
            <IonButton 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1}
              className={styles.paginationButton}
              >
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
            <span className={styles.currentPage}>{currentPage}</span>
            <IonButton 
              onClick={handleNextPage} 
              disabled={currentPage === Math.ceil(filteredRecipes.length / recipesPerPage)}
              className={styles.paginationButton}
              >
              <IonIcon icon={arrowForwardOutline} />
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Home;
