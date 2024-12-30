import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
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
  IonBackButton, 
  IonRow, 
  IonCol, 
  IonAlert, 
  IonSearchbar, 
  IonPopover, 
  IonChip 
} from '@ionic/react';
import { clipboard, home, trash, funnelOutline, close, arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';  
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getRecipes, deleteRecipe } from '../firebase_config';
import { useHistory } from 'react-router-dom';
import './Myrecipes.css';

const Myrecipes: React.FC = () => {
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

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

  const handleDeleteRecipe = async (recipeId: string) => {
      try {
          await deleteRecipe(recipeId);
          setUserRecipes(userRecipes.filter(recipe => recipe.id !== recipeId));  // Eliminar la receta del estado local
          console.log("Receta eliminada con éxito");
      } catch (error) {
          console.error("Error al eliminar la receta:", error);
      }
  };

  const confirmDelete = (recipeId: string) => {
      setRecipeToDelete(recipeId);
      setShowAlert(true);
  };

  const filteredRecipes = userRecipes.filter((recipe) => {
    const matchesText = recipe.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesChips = selectedChips.length === 0 || (recipe.chips && recipe.chips.some((chip: string) => selectedChips.includes(chip)));
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

  const toggleChipFilter = (chip: string) => {
    setSelectedChips((prevSelectedChips) =>
      prevSelectedChips.includes(chip)
        ? prevSelectedChips.filter((selectedChip) => selectedChip !== chip)
        : [...prevSelectedChips, chip]
    );
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
              <IonToolbar>
                  <IonSearchbar
                      value={searchText}
                      onIonInput={(e) => setSearchText(e.target.value!)}
                      debounce={250}
                  ></IonSearchbar>
                  <IonButtons slot="end">
                      <IonButton onClick={() => setShowFilterPopover(true)}>
                          <IonIcon slot="icon-only" icon={funnelOutline}></IonIcon>
                      </IonButton>
                  </IonButtons>
              </IonToolbar>

              {selectedChips.map((chip, index) => (
                  <IonChip
                      key={index}
                      color="medium"
                      onClick={() => toggleChipFilter(chip)}
                  >
                      {chip}
                      <IonIcon
                          icon={close}
                          slot="end"
                          onClick={(e) => {
                              e.stopPropagation();
                              toggleChipFilter(chip);
                          }}
                      />
                  </IonChip>
              ))}

              <IonPopover
                  isOpen={showFilterPopover}
                  onDidDismiss={() => setShowFilterPopover(false)}
              >
                  <IonContent className="ion-padding">
                      <h3>Filtrar:</h3>
                      {['Pasta', 'Cremoso', 'Rápido', 'Italiana', 'Mariscos', 'Gourmet', 'Salsa', 'Delicioso', 'Atún', 'Ensalada', 'Fresco', 'Saludable', 'Pollo', 'Sabroso', 'Tradicional', 'Chorizo', 'Familiar'].map((chip, index) => (
                          <IonChip
                              key={index}
                              onClick={() => toggleChipFilter(chip)}
                              color={selectedChips.includes(chip) ? 'primary' : 'medium'}
                          >
                              {chip}
                          </IonChip>
                      ))}
                  </IonContent>
              </IonPopover>

              {displayedRecipes.length === 0 ? (
                  <p>No has creado recetas todavía.</p>
              ) : (
                  displayedRecipes.map((recipe) => (
                      <IonCard key={recipe.id} button onClick={() => goToEditRecipe(recipe.id)}>
                          <img src={recipe.image} alt={recipe.title} />
                          <IonCardHeader>
                              <IonRow>
                                  <IonCol>
                                      <IonCardTitle><b>{recipe.title}</b></IonCardTitle>
                                  </IonCol>
                                  <IonCol size="auto" className="ion-text-right">
                                      <IonButton 
                                          color="danger" 
                                          fill="outline"
                                          size="small"
                                          onClick={(e) => { 
                                              e.stopPropagation();
                                              confirmDelete(recipe.id); 
                                          }}
                                      >
                                          <IonIcon icon={trash} color="danger" />
                                      </IonButton>
                                  </IonCol>
                              </IonRow>
                          </IonCardHeader>
                      </IonCard>
                  ))
              )}

              <div className="paginationContainer">
                  <IonButton 
                        onClick={handlePreviousPage} 
                        disabled={currentPage === 1}
                        className="paginationButton"
                        >
                      <IonIcon icon={arrowBackOutline} />
                  </IonButton>
                  <span className="currentPage">{currentPage}</span>
                  <IonButton 
                    onClick={handleNextPage} 
                    disabled={currentPage === Math.ceil(filteredRecipes.length / recipesPerPage)}
                    className="paginationButton"
                    >
                      <IonIcon icon={arrowForwardOutline} />
                  </IonButton>
              </div>
          </IonContent>

          <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header={'¿Estás seguro de eliminar la receta?'}
              buttons={[
                  {
                      text: 'No',
                      role: 'cancel',
                      handler: () => {
                          setShowAlert(false);
                      }
                  },
                  {
                      text: 'Sí',
                      handler: () => {
                          if (recipeToDelete) {
                              handleDeleteRecipe(recipeToDelete);
                          }
                          setShowAlert(false);
                      }
                  }
              ]}
          />
      </IonPage>
  );
};

export default Myrecipes;
