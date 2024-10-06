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
  import './Matias.css';
  
  const Matias: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/Aboutus"></IonBackButton>
            </IonButtons>
            <IonTitle>Matías Barrios</IonTitle>
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
          <IonBreadcrumb href="/Matias">
            Matías Barrios
            <IonIcon slot="end" icon={person}></IonIcon>
          </IonBreadcrumb>
        </IonBreadcrumbs>
        <IonContent className="ion-padding">
          <center><img src="Autor_images/Matias.jpeg" style={{ width: '40%', cursor: 'pointer' }} /></center>
          <center><p>Soy Matías Barrios, estudiante de ingenieria en informatica de DuocUC, siempre motivado a aprender mas y a ser un buen estudiante. En este equipo cumplo el rol de programador y creador principal de "RecetApp".</p></center>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Matias;
  