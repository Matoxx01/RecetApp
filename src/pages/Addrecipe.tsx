import React, { useState } from 'react';
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
  IonReorderGroup,
  ItemReorderEventDetail,
  IonBackButton,
  IonReorder,
  IonLabel,
  IonButton,
  IonImg,
  IonPopover,
} from '@ionic/react';
import { getDatabase, ref, push } from 'firebase/database';
import { useHistory } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { database, auth } from '../firebase_config';
import { addOutline, home, imageOutline, removeCircleOutline, person } from 'ionicons/icons';
import './Addrecipe.css';

const Addrecipe: React.FC = () => {
  const auth = getAuth();
  const history = useHistory();
  const [busy, setBusy] = useState<boolean>(false)
  const [nick, setNick] = useState(auth.currentUser?.displayName || '');
  const [title, setTitle] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [preparation, setPreparation] = useState<string[]>(['']);
  const [image, setImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedServings, setSelectedServings] = useState<string | null>(null);

  const tags = [
    'Pescados', 'Pollo', 'Carne', 'Legumbre', 'Mariscos',
     'Entrada', 'Plato Principal', 'Salsas', 'Dulces', 
     'Bebidas', 'Vegetariano', 'Vegano', 'Navidad', 'Cumpleaños'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prevSelected =>
      prevSelected.includes(tag)
        ? prevSelected.filter(t => t !== tag)
        : [...prevSelected, tag]
    );
  };

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    const reorderedList = event.detail.complete(list);
    setList(reorderedList);
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
            setImage(resizedBase64);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
  
    const user = auth.currentUser;
    if (!user) {
      setToastMessage('No estás autenticado. Inicia sesión primero.');
      setShowToast(true);
      setBusy(false);
      return;
    }
    
    if (!selectedServings) {
      setToastMessage('Por favor selecciona una opción de porciones.');
      setShowToast(true);
      setBusy(false);
      return;
    }
    
    const recipeData = {
      title,
      description,
      ingredients,
      preparation,
      image,
      chips: selectedTags,
      servings: selectedServings,
      author: nick,
      likes: 0,
      uid: user.uid
    };
  
    try {
      const recipesRef = ref(database, 'recetas');
      await push(recipesRef, recipeData);
      console.log('Receta subida correctamente:', recipeData);
      setToastMessage('Receta subida correctamente.');
      setShowToast(true);
      history.push('/home');
    } catch (error) {
      console.error('Error al subir la receta:', error);
      setToastMessage('Error al subir la receta.');
      setShowToast(true);
    } finally {
      setBusy(false);
    }
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const addPreparationStep = () => {
    setPreparation([...preparation, '']);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handlePreparationChange = (index: number, value: string) => {
    const updatedPreparation = [...preparation];
    updatedPreparation[index] = value;
    setPreparation(updatedPreparation);
  };

  const removeIngredientField = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const removePreparationStep = (index: number) => {
    setPreparation(preparation.filter((_, i) => i !== index));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Agregar Receta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonBreadcrumbs>
        <IonBreadcrumb href="/home">
          Home
          <IonIcon slot="end" icon={home}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/Addrecipe">
          Agregar Receta
          <IonIcon slot="end" icon={addOutline}></IonIcon>
        </IonBreadcrumb>
      </IonBreadcrumbs>

      <IonLoading message="Cargando..." duration={0} isOpen={busy} />
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
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

          {image && (
            <IonItem>
              <IonImg src={image} alt="Imagen seleccionada" />
            </IonItem>
          )}

          <IonItem>
            <IonLabel position="floating">Título</IonLabel>
            <IonInput
              value={title}
              placeholder="Nombre de la receta"
              onIonChange={e => setTitle(e.detail.value!)}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonTextarea
              value={description}
              placeholder="Breve descripción de la receta"
              onIonChange={e => setDescription(e.detail.value!)}
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
                <center><h3>Etiquetas</h3></center>
                  {tags.map((tag, index) => (
                    <IonChip
                      key={index}
                      onClick={() => toggleTag(tag)}
                      className={selectedTags.includes(tag) ? 'selectedChip' : 'chip'}
                    >
                      <IonLabel>{tag}</IonLabel>
                    </IonChip>
                  ))}
              </div>
            </IonPopover>
          </IonItem>

          <IonItem>
            <IonLabel>Porciones</IonLabel>
            {['1-4', '4-6', '6-8', '8+'].map((serving, index) => (
              <IonChip
                key={index}
                onClick={() => setSelectedServings(serving)}
                className={selectedServings === serving ? 'selectedChip' : 'chip'}
              >
                <IonIcon icon={person} />
                <IonLabel>{serving}</IonLabel>
              </IonChip>
            ))}
          </IonItem>

          <IonItem>
              <IonLabel>Ingredientes</IonLabel>
              <IonButton slot="end" onClick={addIngredientField}>
                <IonIcon icon={addOutline} /> Añadir
              </IonButton>
            </IonItem>
            <IonReorderGroup disabled={false} onIonItemReorder={(e) => handleReorder(e, ingredients, setIngredients)}>
              {ingredients.map((ingredient, index) => (
                <IonItem key={index}>
                  <IonReorder slot="start" />
                  <IonLabel position="fixed">{index + 1}.-</IonLabel>
                  <IonInput
                    value={ingredient}
                    placeholder={`Ingrediente ${index + 1}`}
                    onIonChange={(e) => handleIngredientChange(index, e.detail.value!)}
                  />
                  <IonButton color="danger" onClick={() => removeIngredientField(index)}>
                    <IonIcon icon={removeCircleOutline} />
                  </IonButton>
                </IonItem>
              ))}
            </IonReorderGroup>

            <IonItem>
                <IonLabel>Preparación</IonLabel>
                <IonButton slot="end" onClick={addPreparationStep}>
                  <IonIcon icon={addOutline} /> Añadir
                </IonButton>
              </IonItem>
              <IonReorderGroup disabled={false} onIonItemReorder={(e) => handleReorder(e, preparation, setPreparation)}>
                {preparation.map((step, index) => (
                  <IonItem key={index}>
                    <IonReorder slot="start" />
                    <IonLabel position="fixed">{index + 1}.-</IonLabel>
                    <IonTextarea
                      value={step}
                      placeholder={`Paso ${index + 1}`}
                      onIonChange={(e) => handlePreparationChange(index, e.detail.value!)}
                    />
                    <IonButton color="danger" onClick={() => removePreparationStep(index)}>
                      <IonIcon icon={removeCircleOutline} />
                    </IonButton>
                  </IonItem>
                ))}
              </IonReorderGroup>

          <IonButton expand="block" type="submit">
            Publicar
          </IonButton>
        </form>
      </IonContent>
      <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message={toastMessage}
      duration={2000}
      />
    </IonPage>
  );
};

export default Addrecipe;
