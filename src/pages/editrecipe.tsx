import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonItem,
  IonInput,
  IonTextarea,
  IonToast,
  IonToolbar,
  IonButtons,
  IonChip,
  IonBreadcrumbs,
  IonLoading,
  IonBreadcrumb,
  IonIcon,
  IonBackButton,
  IonLabel,
  IonButton,
  IonImg,
  IonPopover,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { getRecipes, updateRecipe } from '../firebase_config';
import {
  addOutline,
  home,
  clipboard,
  imageOutline,
  create,
  removeCircleOutline,
} from 'ionicons/icons';
import './editrecipe.css';

const EditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showPopover, setShowPopover] = useState(false);

  const tags = [
    'Pescados', 'Pollo', 'Carne', 'Legumbre', 'Mariscos',
    'Entrada', 'Plato Principal', 'Salsas', 'Dulces',
    'Bebidas', 'Vegetariano', 'Vegano', 'Navidad', 'Cumpleaños'
  ];

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const recetas = await getRecipes();
      const recipe = recetas.find((r: any) => r.id === id);
      if (recipe) {
        setRecipe({
          ...recipe,
          ingredients: recipe.ingredients || [''],
          preparation: recipe.preparation || [''],
          chips: recipe.chips || [],
        });
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  const toggleTag = (tag: string) => {
    setRecipe((prevRecipe: any) => ({
      ...prevRecipe,
      chips: prevRecipe.chips.includes(tag)
        ? prevRecipe.chips.filter((t: string) => t !== tag)
        : [...prevRecipe.chips, tag],
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = 684;
            canvas.height = 350;
            ctx.drawImage(img, 0, 0, 684, 350);
            const resizedBase64 = canvas.toDataURL('image/jpeg');
            setRecipe((prevRecipe: any) => ({
              ...prevRecipe,
              image: resizedBase64,
            }));
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateRecipe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (recipe) {
      setLoading(true);
      try {
        await updateRecipe(id, recipe);
        setToastMessage('Receta actualizada correctamente.');
        setShowToast(true);
        setTimeout(() => history.push('/Myrecipes'), 1000);
      } catch (error) {
        console.error('Error al actualizar la receta:', error);
        setToastMessage('Error al actualizar la receta.');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const addIngredientField = () => {
    setRecipe((prevRecipe: any) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ''],
    }));
  };

  const addPreparationStep = () => {
    setRecipe((prevRecipe: any) => ({
      ...prevRecipe,
      preparation: [...prevRecipe.preparation, ''],
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    setRecipe((prevRecipe: any) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index] = value;
      return { ...prevRecipe, ingredients: updatedIngredients };
    });
  };

  const handlePreparationChange = (index: number, value: string) => {
    setRecipe((prevRecipe: any) => {
      const updatedPreparation = [...prevRecipe.preparation];
      updatedPreparation[index] = value;
      return { ...prevRecipe, preparation: updatedPreparation };
    });
  };

  const removeIngredientField = (index: number) => {
    setRecipe((prevRecipe: any) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((_: string, i: number) => i !== index),
    }));
  };

  const removePreparationStep = (index: number) => {
    setRecipe((prevRecipe: any) => ({
      ...prevRecipe,
      preparation: prevRecipe.preparation.filter((_: string, i: number) => i !== index),
    }));
  };

  if (!recipe) return <IonLoading isOpen={loading} message="Cargando..." />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Editar Receta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/Myrecipes">
          Mis Recetas
          <IonIcon slot="end" icon={clipboard}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/editrecipe">
          Editar Receta
          <IonIcon slot="end" icon={create}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>

      <IonLoading message="Cargando..." duration={0} isOpen={loading} />
      <IonContent className="ion-padding">
        <form onSubmit={handleUpdateRecipe}>
          <IonItem>
            <IonLabel>Imagen</IonLabel>
            <IonButton slot="end" onClick={() => document.getElementById('fileInput')?.click()}>
              <IonIcon icon={imageOutline} slot="start" /> Seleccionar archivo
            </IonButton>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </IonItem>

          {recipe.image && (
            <IonItem>
              <IonImg src={recipe.image} alt="Imagen seleccionada" />
            </IonItem>
          )}

          <IonItem>
            <IonLabel position="floating">Título</IonLabel>
            <IonInput
              value={recipe.title}
              placeholder="Nombre de la receta"
              onIonChange={(e) => setRecipe({ ...recipe, title: e.detail.value! })}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonTextarea
              value={recipe.description}
              placeholder="Breve descripción de la receta"
              onIonChange={(e) => setRecipe({ ...recipe, description: e.detail.value! })}
              required
              autoGrow={true}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Etiquetas</IonLabel>
            <IonButton onClick={() => setShowPopover(true)} slot="end">
              Seleccionar Etiquetas
            </IonButton>
            <IonPopover
              isOpen={showPopover}
              onDidDismiss={() => setShowPopover(false)}
            >
              <div className="popover-content">
                {tags.map((tag) => (
                  <IonChip
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    color={recipe.chips.includes(tag) ? 'primary' : 'medium'}
                  >
                    <IonLabel>{tag}</IonLabel>
                  </IonChip>
                ))}
              </div>
            </IonPopover>
          </IonItem>

          <IonItem>
            <IonLabel>Ingredientes</IonLabel>
            <IonButton onClick={addIngredientField} slot="end">
              <IonIcon icon={addOutline} />
            </IonButton>
          </IonItem>

          {recipe.ingredients.map((ingredient: string, index: number) => (
            <IonItem key={index}>
              <IonInput
                value={ingredient}
                placeholder="Ingrediente"
                onIonChange={(e) => handleIngredientChange(index, e.detail.value!)}
              />
              <IonButton
                color="danger"
                onClick={() => removeIngredientField(index)}
                slot="end"
              >
                <IonIcon icon={removeCircleOutline} />
              </IonButton>
            </IonItem>
          ))}

          <IonItem>
            <IonLabel>Preparación</IonLabel>
            <IonButton onClick={addPreparationStep} slot="end">
              <IonIcon icon={addOutline} />
            </IonButton>
          </IonItem>

          {recipe.preparation.map((step: string, index: number) => (
            <IonItem key={index}>
              <IonTextarea
                value={step}
                placeholder={`Paso ${index + 1}`}
                onIonChange={(e) => handlePreparationChange(index, e.detail.value!)}
              />
              <IonButton
                color="danger"
                onClick={() => removePreparationStep(index)}
                slot="end"
              >
                <IonIcon icon={removeCircleOutline} />
              </IonButton>
            </IonItem>
          ))}

          <IonButton expand="block" type="submit">
            Guardar Cambios
          </IonButton>
        </form>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditRecipe;
