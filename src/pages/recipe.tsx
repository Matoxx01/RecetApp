import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonBackButton,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonCheckbox,
  IonSpinner,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { fastFood, home } from 'ionicons/icons';
import './recipe.css';
import { getRecipes } from '../firebase_config';

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]); // Estado para los checkboxes

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const allRecipes = await getRecipes();
        const selectedRecipe = allRecipes.find((rec: any) => rec.id === id);
        setRecipe(selectedRecipe);
        setCheckedSteps(new Array(selectedRecipe?.preparation.length).fill(false)); // Inicializa el estado
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
