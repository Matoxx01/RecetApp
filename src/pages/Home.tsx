import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../App';
import { 
  IonContent, 
  IonCheckbox,
  IonHeader, 
  IonPage, 
  IonBreadcrumb,
  IonBreadcrumbs,
  IonTitle,
  IonModal,
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
  IonFooter,
  IonSearchbar,
  IonPopover
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { getRecipes, toggleFavorite, getFavorites } from '../firebase_config';
import { home, funnelOutline, arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
import styles from './Home.module.scss';

function Home() {
  const { user, isLoggedIn } = useAuth();
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rememberSelection, setRememberSelection] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const location = useLocation();
  const allowedPages = ['/home'];
  const isMenuEnabled = allowedPages.some((path) => location.pathname.startsWith(path));

  const menuRef = useRef<HTMLIonMenuElement | null>(null);

  const handleRefresh = (event: CustomEvent) => {
    setLoading(true);
    setTimeout(async () => {
      await fetchRecipes();
      event.detail.complete();
    }, 1000);
  };

  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.pathname === '/home') {
        setLoading(true); // Activa el estado de carga
        fetchRecipes();   // Obtiene las recetas
  
        // Verifica si el usuario está autenticado y obtiene los favoritos
        if (isLoggedIn && user?.uid) {
          getFavorites(user.uid).then((favoriteIds) => {
            console.log("Favorites fetched:", favoriteIds);
            setFavorites(favoriteIds);
          });
        }
      }
    });
  
    return () => {
      unlisten();
    };
  }, [history, isLoggedIn, user]);  

  useEffect(() => {
    // Verifica si el usuario está autenticado cada vez que se vuelve a la página
    if (!isLoggedIn) {
      const userSelection = localStorage.getItem('rememberPopupSelection');
      if (userSelection !== 'true') {
        setShowPopup(true); // Muestra el modal si el usuario no está autenticado
      }
    }
  }, [isLoggedIn]); // Se activa cada vez que el estado de autenticación cambia  

  useEffect(() => {
    if (user) {
        console.log("Usuario autenticado:", user);
    } else {
        console.log("Usuario no autenticado.");
    }
}, [user]);

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

  useEffect(() => {
    // Obtener las recetas
    getRecipes().then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const userSelection = localStorage.getItem('rememberPopupSelection');
    if (!isLoggedIn && userSelection !== 'true') {
      setShowPopup(true);
    }
  }, [isLoggedIn]);

  const handleContinueWithoutLogin = () => {
    if (rememberSelection) {
      localStorage.setItem('rememberPopupSelection', 'true');
    }
    setShowPopup(false);
  };

  const handleLoginRedirect = () => {
    setShowPopup(false);
    history.push('/Login_start');
  };

  const isFavorite = (recipeId: string) => {
    return favorites.includes(recipeId);
  };

  const handleToggleFavorite = (recipeId: string) => {
    console.log("Toggling favorite for recipe:", recipeId);
    console.log("User object:", user);
    if (user?.uid) {
      const isAlreadyFavorite = isFavorite(recipeId);
      console.log("Is already favorite?", isAlreadyFavorite);
      toggleFavorite(user.uid, recipeId, isAlreadyFavorite);
      // Actualizar el estado de favoritos después de modificarlo
      setFavorites((prevFavorites) =>
        isAlreadyFavorite
          ? prevFavorites.filter((id) => id !== recipeId)
          : [...prevFavorites, recipeId]
      );
    } else {
      console.log("User is not logged in or user.uid is undefined.");
    }
  };

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
      <IonMenu swipeGesture={isMenuEnabled} disabled={!isMenuEnabled} ref={menuRef} contentId="main-content">
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
          <IonRefresher className={`${styles.pageUpdate}`}  slot="fixed" onIonRefresh={handleRefresh}>
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
          
          <div className={styles.popover}>
            <IonPopover
              isOpen={showFilterPopover}
              onDidDismiss={() => setShowFilterPopover(false)}
            >
              <IonContent className="ion-padding ion-popover-content">
                <center><h3>Filtrado</h3></center>
                {['Pescados', 'Pollo', 'Carne', 'Legumbre', 'Mariscos', 'Entrada', 'Plato Principal', 'Salsas', 'Dulces', 'Bebidas', 'Vegetariano', 'Vegano', 'Navidad', 'Cumpleaños'].map((chip, index) => (
                  <IonChip
                    outline={true}
                    key={index}
                    className={`${styles.chip} ${selectedChips.includes(chip) ? styles.selectedChip : ''}`}
                    onClick={() => toggleChipFilter(chip)}
                    color={selectedChips.includes(chip) ? 'primary' : 'medium'}
                  >
                    {chip}
                  </IonChip>
                ))}
              </IonContent>
            </IonPopover>
          </div>
          
          <div className={styles.recipeContainer}></div>
          {displayedRecipes.map((recipe) => (
            <IonCard
            key={recipe.id} 
            onClick={() => history.push(`/recipe/${recipe.id}`)}
            className={styles.recipeCard}
          >
            {isLoggedIn && (
              <IonButton
                fill="outline"
                className={`${styles['favorite-button']} ${isFavorite(recipe.id) ? styles.favorite : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(recipe.id);
                }}
              >
                <IonIcon
                  icon={isFavorite(recipe.id) ? '/heart.svg' : '/heart_red.svg'}
                  className={`${styles['favorite-icon']} ${isFavorite(recipe.id) ? styles['favorite-active'] : ''}`}
                ></IonIcon>
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
      <IonModal isOpen={showPopup} backdropDismiss={false}>
        <IonContent className="ion-padding">
          <h2>¡Bienvenido a RecetApp!</h2>
          <p>
            Si quieres acceder a todas las funciones de RecetApp, primero debes iniciar sesión.
          </p>
          <IonItem>
            <ol>
              <li
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onClick={() => setRememberSelection(!rememberSelection)}
              >
                <IonCheckbox
                  style={{ marginRight: "8px" }}
                  checked={rememberSelection}
                  onIonChange={(e) => e.stopPropagation()} // Evita el doble cambio por el evento de 'li'
                />
                <span>Recordar selección</span>
              </li>
            </ol>
          </IonItem>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButton expand="block" onClick={handleLoginRedirect}>
              Ingresar
            </IonButton>
            <IonButton expand="block" fill="outline" onClick={handleContinueWithoutLogin}>
              Continuar sin ingresar
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    </>
  );
}

export default Home;
