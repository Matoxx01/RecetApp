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
import { fastFood, home } from 'ionicons/icons';
import './recipe.css';
import { getRecipes, updateLikeCount } from '../firebase_config';
import { useAuth } from '../App';

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const allRecipes = await getRecipes();
        const selectedRecipe = allRecipes.find((rec: any) => rec.id === id);
        setRecipe(selectedRecipe);
        setCheckedSteps(new Array(selectedRecipe?.preparation.length).fill(false));
        const savedLikeCount = parseInt(localStorage.getItem(`likeCount-${id}`) || '0');
        const savedIsLiked = localStorage.getItem(`isLiked-${id}`) === 'true';
        setLikeCount(savedLikeCount);
        setIsLiked(savedIsLiked);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleStepClick = (index: number) => {
    const newCheckedSteps = [...checkedSteps];
    newCheckedSteps[index] = !newCheckedSteps[index];
    setCheckedSteps(newCheckedSteps);
  };

  const handleLikeClick = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);

    await updateLikeCount(id, newLikeCount);

    localStorage.setItem(`likeCount-${id}`, newLikeCount.toString());
    localStorage.setItem(`isLiked-${id}`, (!isLiked).toString());

    await updateLikeCount(id, newLikeCount);
  };

  if (!recipe) {
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
              <li key={index}>{ingredient}</li>
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
