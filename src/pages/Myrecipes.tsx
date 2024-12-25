import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonItem, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonButton, 
    IonToolbar, 
    IonButtons, 
    IonBreadcrumbs, 
    IonBreadcrumb, 
    IonIcon, 
    IonBackButton
  } from '@ionic/react';
  import { clipboard, home } from 'ionicons/icons';
  import { useEffect, useState } from 'react';
  import { getAuth } from 'firebase/auth';
  import { getRecipes } from '../firebase_config';
  import { useHistory } from 'react-router-dom';
  import './Myrecipes.css';
  
  const Myrecipes: React.FC = () => {
    const [userRecipes, setUserRecipes] = useState<any[]>([]);
    const auth = getAuth();
    const history = useHistory();
  
    useEffect(() => {
        const fetchUserRecipes = async () => {
          const user = auth.currentUser;
          if (user) {
            const recipes = await getRecipes();
            const userRecipes = recipes.filter((recipe: any) => recipe.uid === user.uid);
            setUserRecipes(userRecipes);
          }
        };
      
        fetchUserRecipes();
      }, [auth]);
      
  
    const goToEditRecipe = (recipeId: string) => {
      history.push(`/editrecipe/${recipeId}`);
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Mis recetas</IonTitle>
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
        </IonBreadcrumbs>
        <IonContent className="ion-padding">
          {userRecipes.length === 0 ? (
            <p>No tienes recetas guardadas.</p>
          ) : (
            userRecipes.map((recipe) => (
              <IonCard key={recipe.id} button onClick={() => goToEditRecipe(recipe.id)}>
                <img src={recipe.image} alt={recipe.title} />
                <IonCardHeader>
                  <IonCardTitle><b>{recipe.title}</b></IonCardTitle>
                </IonCardHeader>
              </IonCard>
            ))
          )}
        </IonContent>
      </IonPage>
    );
  };
  
  export default Myrecipes;
  