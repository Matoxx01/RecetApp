import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonBackButton,
  IonBreadcrumb,
  IonButton,
  IonChip,
  IonBreadcrumbs,
  IonButtons,
  IonCheckbox,
  IonSpinner,
  IonContent,
  IonLabel,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { fastFood, home, person } from 'ionicons/icons';
import './recipe.css';
import { getRecipes, updateLikeCount, toggleLikes  } from '../firebase_config';
import { useAuth } from '../App';
import { onValue, ref } from "firebase/database";
import { database } from "../firebase_config";

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { isLoggedIn, user } = useAuth();
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const allRecipes = await getRecipes();
        const selectedRecipe = allRecipes.find((rec: any) => rec.id === id);
        setRecipe(selectedRecipe);
        setCheckedSteps(new Array(selectedRecipe?.preparation.length).fill(false));
        setCheckedIngredients(new Array(selectedRecipe?.ingredients.length).fill(false));
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    };

    fetchRecipe();

    if (user) {
      const likesRef = ref(database, `likes&favs/${user.uid}/likes/${id}`);
      const unsubscribe = onValue(likesRef, (snapshot) => {
        setIsLiked(snapshot.exists());
      });

      const recipeLikesRef = ref(database, `recetas/${id}/likes`);
      onValue(recipeLikesRef, (snapshot) => {
        if (snapshot.exists()) {
          setLikeCount(snapshot.val());
        }
      });

      return () => unsubscribe();
    }
  }, [id, user]);

  const handleStepClick = (index: number) => {
    console.log(`Paso ${index + 1} marcado como ${!checkedSteps[index] ? 'completado' : 'pendiente'}`);
    const newCheckedSteps = [...checkedSteps];
    newCheckedSteps[index] = !newCheckedSteps[index];
    setCheckedSteps(newCheckedSteps);
  };

  const handleIngredientClick = (index: number) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  const handleLikeClick = async () => {
    if (user) {
      const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
      setIsLiked(!isLiked);
      await toggleLikes(user.uid, id, isLiked);
      await updateLikeCount(id, newLikeCount);
    }
  };

  if (!recipe) {
    console.log("Receta no cargada, mostrando spinner.");
    return (
      <IonPage>
        <IonContent className="ion-padding" fullscreen>
          <div className="loading-container">
            <IonSpinner name="crescent" className="loading-spinner" />
            <p className="loading-text">Cargando receta...</p>
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
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{recipe.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonBreadcrumbs>
          <IonBreadcrumb href="/home">
            <IonIcon slot="start" icon={home} />
            Home
          </IonBreadcrumb>
          <IonBreadcrumb>
            <IonIcon slot="start" icon={fastFood} />
            {recipe.title}
          </IonBreadcrumb>
        </IonBreadcrumbs>

        <div className="recipe-container">
          <img alt={recipe.title} src={recipe.image} className="recipe-image" />
          
          <p><b>Subido por: </b>{recipe.author}</p>
          <p>{recipe.description}</p>
          <br/>
          <div className="servings-container">
            <IonIcon icon={person} className="servings-icon" />
            <span><b> Porciones: </b>{recipe.servings || 'No especificado'}</span>
          </div>
          <br/>

          {isLoggedIn && ( 
            <div className="like-container">
              <IonButton onClick={handleLikeClick} color={isLiked ? 'primary' : 'medium'} fill="outline">
                <IonIcon icon={isLiked ? "/like hand.svg" : "/like hand.svg"} slot="start" />
                <IonLabel>
                  <span>Likes: {likeCount}</span>
                </IonLabel>
              </IonButton>
            </div>
          )}
          
          <br/>
          <div className="chips-container">
            {Array.isArray(recipe.chips) && recipe.chips.length > 0 ? (
              recipe.chips.map((chip: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, chipIndex: React.Key | null | undefined) => (
                <IonChip key={chipIndex} className="recipe-chip">
                  {chip}
                </IonChip>
              ))
            ) : (
              <IonLabel className="no-chips-label">No hay etiquetas disponibles</IonLabel>
            )}
          </div>

          <h2>Ingredientes</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index} className="ingredient-item" onClick={() => handleIngredientClick(index)}>
                <IonCheckbox
                  className="ingredient-checkbox"
                  checked={checkedIngredients[index]}
                  onIonChange={() => handleIngredientClick(index)}
                />
                <span> {ingredient}</span>
              </li>
            ))}
          </ul>

          <h2>Preparación</h2>
          <ol className="preparation-list">
            {recipe.preparation.map((step: string, index: number) => (
              <li key={index} className="preparation-step" onClick={() => handleStepClick(index)}>
                <IonCheckbox
                  className="step-checkbox"
                  checked={checkedSteps[index]}
                  onIonChange={() => handleStepClick(index)}
                />
                <span><b>{index + 1}.</b> {step}</span>
              </li>
            ))}
          </ol>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Recipe;
