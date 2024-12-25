import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonTextarea, 
  IonButton, 
  IonToolbar, 
  IonButtons, 
  IonBreadcrumbs, 
  IonBreadcrumb, 
  IonIcon, 
  IonBackButton
} from '@ionic/react';
import { clipboard, home, create } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getRecipes, updateRecipe } from '../firebase_config';
import './editrecipe.css';

const EditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchRecipe = async () => {
      const recetas = await getRecipes();
      const recipe = recetas.find((r: any) => r.id === id);
      if (recipe) {
        setRecipe({
          ...recipe,
          ingredients: recipe.ingredients || [],
          preparation: recipe.preparation || [],
          chips: recipe.chips || [],
        });
      } else {
        console.log('Receta no encontrada');
      }
    };
  
    fetchRecipe();
  }, [id]);  

  const handleUpdateRecipe = async () => {
    if (recipe) {
      await updateRecipe(id, recipe);
      history.push('/Myrecipes');
    }
  };  

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe: any) => ({
      ...prevRecipe,
      [name]: name === 'ingredients' || name === 'preparation' || name === 'chips'
        ? value.split(', ')
        : value,  
    }));
  };  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Editor de receta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/Myrecipes">
          Mis recetas
          <IonIcon slot="end" icon={clipboard}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/editrecipe">
          Editor de receta
          <IonIcon slot="end" icon={create}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>
      <IonContent className="ion-padding">
        {recipe ? (
          <div>
            <IonItem>
              <IonLabel position="floating">Título</IonLabel>
              <IonInput 
                name="title" 
                value={recipe.title} 
                onIonChange={handleChange} 
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Descripción</IonLabel>
              <IonTextarea 
                name="description" 
                value={recipe.description} 
                onIonChange={handleChange} 
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Ingredientes</IonLabel>
              <IonTextarea 
                name="ingredients" 
                value={recipe.ingredients.join(', ')}
                onIonChange={handleChange} 
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Preparación</IonLabel>
              <IonTextarea 
                name="preparation" 
                value={recipe.preparation.join(', ')}
                onIonChange={handleChange} 
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Imagen</IonLabel>
              <IonInput 
                name="image" 
                value={recipe.image} 
                onIonChange={handleChange} 
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Etiquetas</IonLabel>
              <IonInput 
                name="chips" 
                value={recipe.chips.join(', ')}
                onIonChange={handleChange} 
              />
            </IonItem>
            <IonButton expand="full" onClick={handleUpdateRecipe}>Guardar cambios</IonButton>
          </div>
        ) : (
          <p>Cargando receta...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditRecipe;
