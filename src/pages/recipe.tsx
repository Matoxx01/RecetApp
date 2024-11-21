import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonLabel,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonTitle, 
    IonCard,
    IonCardContent,
    IonThumbnail,
    IonList,
    IonItem,
    IonToolbar,
    IonCheckbox,
    IonButtons,
    IonBackButton
 } from '@ionic/react';
import './recipe.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getRecipes } from '../firebase_config';
import { fastFood, home } from 'ionicons/icons';

const recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const allRecipes = await getRecipes();
        const selectedRecipe = allRecipes.find((rec: any) => rec.id === id); 
        setRecipe(selectedRecipe);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <IonContent>Cargando...</IonContent>; 
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
          <IonTitle>{recipe.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/recipe">
          {recipe.title}
          <IonIcon slot="end" icon={fastFood}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>
      <IonContent className="ion-padding">
        <img alt={recipe.title} src={recipe.image} />
        <h1>Ingredientes:</h1>
        <ul>
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h1>Preparación:</h1>
        <ol>
          {recipe.preparation.map((step: string, index: number) => (
            <li key={index}>
              <IonCheckbox labelPlacement="end"></IonCheckbox>
              <b>{index + 1}.</b> {step}
            </li>
          ))}
        </ol>
      </IonContent>
    </IonPage>
  );
};

export default recipe;
