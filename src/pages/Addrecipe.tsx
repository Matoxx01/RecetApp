import React, { useState } from 'react';
import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonItem,
    IonInput,
    IonTextarea,
    IonToolbar,
    IonButtons,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonBackButton,
    IonLabel,
    IonButton,
    IonImg
} from '@ionic/react';
import { addOutline, home, imageOutline } from 'ionicons/icons';
import './Addrecipe.css';

const Addrecipe: React.FC = () => {
  // Estados para manejar los datos del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparation, setPreparation] = useState('');
  const [image, setImage] = useState<string | null>(null);

  // Función para manejar la selección de una imagen
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Guardar la URL temporal de la imagen
    }
  };

  const handleSubmit = () => {
    // Aquí puedes manejar el envío de los datos del formulario
    console.log({
      title,
      description,
      ingredients,
      preparation,
      image
    });
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

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          {/* Selección de imagen */}
          <IonItem>
            <IonLabel>Imagen</IonLabel>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </IonItem>

          {/* Mostrar imagen seleccionada */}
          {image && (
            <IonItem>
              <IonImg src={image} alt="Imagen seleccionada" />
            </IonItem>
          )}

          {/* Campo para el título */}
          <IonItem>
            <IonLabel position="floating">Título</IonLabel>
            <IonInput 
              value={title} 
              placeholder="Nombre de la receta" 
              onIonChange={e => setTitle(e.detail.value!)}
              required
            />
          </IonItem>

          {/* Campo para la descripción */}
          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonTextarea 
              value={description} 
              placeholder="Breve descripción de la receta" 
              onIonChange={e => setDescription(e.detail.value!)}
              required
            />
          </IonItem>

          {/* Campo para los ingredientes */}
          <IonItem>
            <IonLabel position="floating">Ingredientes</IonLabel>
            <IonTextarea 
              value={ingredients} 
              placeholder="Lista de ingredientes" 
              onIonChange={e => setIngredients(e.detail.value!)}
              required
            />
          </IonItem>

          {/* Campo para la preparación */}
          <IonItem>
            <IonLabel position="floating">Preparación</IonLabel>
            <IonTextarea 
              value={preparation} 
              placeholder="Instrucciones para preparar la receta" 
              onIonChange={e => setPreparation(e.detail.value!)}
              required
            />
          </IonItem>

          {/* Botón para enviar el formulario */}
          <IonButton expand="block" type="submit">
            Publicar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Addrecipe;
