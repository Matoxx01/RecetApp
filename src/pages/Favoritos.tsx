import { 
  IonContent, 
  IonHeader, 
  IonCardTitle,
  IonCardHeader,
  IonButton,
  IonSearchbar,
  IonPage, 
  IonRefresher,
  IonCard,
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBreadcrumbs,
  IonBreadcrumb,
  IonSpinner,
  IonRefresherContent,
  IonIcon,
  IonBackButton
} from '@ionic/react';
import styles from './Favoritos.module.scss';
import React, { useState, useEffect } from 'react';
import { getRecipes, getFavorites, toggleFavorite } from '../firebase_config';
import { useHistory } from 'react-router-dom';
import { star, home, trash, arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
import { useAuth } from '../App';

const Favoritos: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState('');
  const { user } = useAuth();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const handleRefresh = (event: CustomEvent) => {
    setLoading(true);
    setTimeout(async () => {
      await fetchData(); // Re-fetch data
      event.detail.complete();
    }, 1000);
  };

  const fetchData = async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      const allRecipes = await getRecipes();
      setRecipes(allRecipes);

      const userFavorites = await getFavorites(user.uid);
      setFavorites(userFavorites);

      const favoriteRecipesList = allRecipes.filter(recipe => userFavorites.includes(recipe.id));
      setFavoriteRecipes(favoriteRecipesList);
    } catch (error) {
      console.error('Error al obtener recetas o favoritos:', error);
    } finally {
      setLoading(false);
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
  }

  useEffect(() => {
    fetchData();
  }, [user]); // Vuelve a cargar los favoritos y las recetas si cambia el usuario

  const removeFromFavorites = async (recipeId: string) => {
    if (!user?.uid) return; // Asegurarse de que el usuario esté autenticado

    await toggleFavorite(user.uid, recipeId, true); // Eliminar de favoritos
    const updatedFavorites = favorites.filter(id => id !== recipeId);
    setFavorites(updatedFavorites);
    // Filtrar las recetas favoritas
    const updatedFavoriteRecipes = favoriteRecipes.filter(recipe => recipe.id !== recipeId);
    setFavoriteRecipes(updatedFavoriteRecipes);
  };

  const filteredFavoriteRecipes = favoriteRecipes.filter((recipe) => {
    const searchTextLower = searchText.toLowerCase();
  
    const matchesText = recipe.title.toLowerCase().includes(searchTextLower);
    const matchesIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchTextLower)
    );
  
    return (matchesText || matchesIngredients);
  });

  useEffect(() => {
    setCurrentPage(1); // Resetear la página cuando cambia el texto de búsqueda
  }, [searchText]);

  // Paginación sobre las recetas filtradas
  const displayedRecipes = filteredFavoriteRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredFavoriteRecipes.length / recipesPerPage)) {
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

  const goToRecipe = (recipeId: string) => {
    history.push(`/recipe/${recipeId}`);
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className={styles.loadingContainer} fullscreen>
          <div className={styles.loadingContainer}>
            <IonSpinner name="crescent" className={styles.loadingSpinner} />
            <p className={styles.loadingText}>Cargando favoritos...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/Favoritos">
          Favoritos
          <IonIcon slot="end" icon={star}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>
      <IonContent className="ion-padding">
        <IonToolbar className={styles.searchBarContainer}>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.target.value!)}
            debounce={250}
            className={styles.searchBar}
          ></IonSearchbar>
        </IonToolbar>
        <IonRefresher className={`${styles.pageUpdate}`} slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={star}
            refreshingSpinner="circles"
            pullingText="Desliza hacia abajo para actualizar"
            refreshingText="Actualizando favoritos..."
          >
          </IonRefresherContent>
        </IonRefresher>
        {filteredFavoriteRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => (
            <IonCard key={recipe.id} onClick={() => goToRecipe(recipe.id)} className={styles.recipeCard}>
              <img alt={recipe.title} src={recipe.image} className={styles.recipeImage} />
              <IonCardHeader>
                <IonCardTitle>
                  <b>{recipe.title}</b>
                </IonCardTitle>
              </IonCardHeader>
              <IonButton
                color="danger"
                fill="clear"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(recipe.id);
                }}
              >
                <IonIcon icon={trash} />
                Eliminar de favoritos
              </IonButton>
            </IonCard>
          ))
        ) : (
          <p>No hay recetas favoritas guardadas.</p>
        )}
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
            disabled={currentPage === Math.ceil(filteredFavoriteRecipes.length / recipesPerPage)}
            className={styles.paginationButton}
          >
            <IonIcon icon={arrowForwardOutline} />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favoritos;
