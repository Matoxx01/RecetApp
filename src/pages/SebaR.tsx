import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonButtons,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol
  } from '@ionic/react';
  import { person, people, home } from 'ionicons/icons';
  import './SebaR.css';
  
  const SebaR: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/Aboutus"></IonBackButton>
            </IonButtons>
            <IonTitle>Sebastian Rojas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonBreadcrumbs>
          <IonBreadcrumb href="/home">
            Home
            <IonIcon slot="end" icon={home}></IonIcon>
          </IonBreadcrumb>
          <IonBreadcrumb href="/Aboutus">
            Sobre Nosotros
            <IonIcon slot="end" icon={people}></IonIcon>
          </IonBreadcrumb>
          <IonBreadcrumb href="/SebaR">
            Sebastian Rojas
            <IonIcon slot="end" icon={person}></IonIcon>
          </IonBreadcrumb>
        </IonBreadcrumbs>
        <IonContent className="ion-padding">
          <center><img src="Autor_images/SebaR.jpeg" style={{ width: '40%', cursor: 'pointer' }} /></center>
          <center><p>Soy Sebastian Rojas, estudiante del instituto profesional Duoc UC. Mi dedicación al proyecto va enfocada al apartado del backend, como programador me esfuerzo dia a dia para dar la mejor solución al software, y como persona también me esfuerzo en ser mejor, ser más atento, pero lo que ya soy es alguien creativo, cauteloso y responsable.</p></center>
        </IonContent>
      </IonPage>
    );
  };
  
  export default SebaR;
  