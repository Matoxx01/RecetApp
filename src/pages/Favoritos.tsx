import { 
  IonContent, 
  IonHeader, 
  IonCardTitle,
  IonCardHeader,
  IonButton,
  IonPage, 
  IonCard,
  IonTitle, 
  IonItem,
  IonCheckbox,
  IonToolbar,
  IonButtons,
  IonBreadcrumbs,
  IonBreadcrumb,
  IonSpinner,
  IonIcon,
  IonBackButton
} from '@ionic/react';
import './Favoritos.css';
import React, { useState, useEffect } from 'react';
import { getRecipes } from '../firebase_config';
import { useHistory } from 'react-router-dom';
import { star, home, heart  } from 'ionicons/icons';

const Favoritos: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        setLoading(true);
        const allRecipes = await getRecipes();
        const filteredRecipes = allRecipes.filter((recipe: Recipe) =>
          favorites.includes(recipe.id)
        );
        setFavoriteRecipes(filteredRecipes);
      } catch (error) {
        console.error('Error al obtener recetas favoritas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteRecipes();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  const removeFromFavorites = (recipeId: string) => {
    const updatedFavorites = favorites.filter((id) => id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
    if (updatedFavorites.length === 0) {
      setFavoriteRecipes([]);
    }
  };

  const goToRecipe = (recipeId: string) => {
    history.push(`/recipe/${recipeId}`);
  };

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
      {loading ? (
        <IonSpinner name="dots" />
      ) : favoriteRecipes.length > 0 ? (
        favoriteRecipes.map((recipe) => (
          <IonCard key={recipe.id} onClick={() => goToRecipe(recipe.id)} className="recipe-card">
            <img alt={recipe.title} src={recipe.image} />
            <IonCardHeader>
              <IonCardTitle><b>{recipe.title}</b></IonCardTitle>
            </IonCardHeader>
            <IonButton
              color="danger"
              fill="clear"
              onClick={(e) => {
                e.stopPropagation();
                removeFromFavorites(recipe.id);
              }}
            >
              <IonIcon icon={heart} />
              Eliminar de favoritos
            </IonButton>
          </IonCard>
        ))
      ) : (
        <p>No hay recetas favoritas guardadas.</p>
      )}
    </IonContent>
  </IonPage>
);
};

export default Favoritos;
