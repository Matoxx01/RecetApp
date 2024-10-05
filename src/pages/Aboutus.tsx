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
import { useHistory } from 'react-router-dom';
import { people, home } from 'ionicons/icons';
import './Aboutus.css';

const Aboutus: React.FC = () => {
  const history = useHistory();

  const handleButtonClick = (route: string) => {
    history.push(route);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Sobre Nosotros</IonTitle>
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
      </IonBreadcrumbs>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <img 
                src="Autor_images/Matias.jpeg" 
                alt="Imagen 1" 
                onClick={() => handleButtonClick('/Matias')} 
                style={{ width: '100%', cursor: 'pointer' }} 
              />
            </IonCol>
            <IonCol>
              <img 
                src="Autor_images/SebaR.jpeg" 
                alt="Imagen 2" 
                onClick={() => handleButtonClick('/SebaR')} 
                style={{ width: '100%', cursor: 'pointer' }} 
              />
            </IonCol>
            <IonCol>
              <img 
                src="Autor_images/SebaN.jpg" 
                alt="Imagen 3" 
                onClick={() => handleButtonClick('/SebaN')} 
                style={{ width: '100%', cursor: 'pointer' }} 
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <center><h1><b>¿Quienes somos?</b></h1></center>
        <center><p>Somos un grupo de tres estudiantes de DuocUC con grandes aspiraciones de programadores en distintas ramas, somos muy unidos y nos encantan lo desafios para construir algo interesante y digno de ver.</p></center>
      </IonContent>
    </IonPage>
  );
};

export default Aboutus;
