import { Redirect, Route } from 'react-router-dom';
import React, { createContext, useContext, useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Fetuccini from './pages/Fetuccini';
import Langostinos from './pages/Langostinos';
import Lasaña_atun from './pages/Lasaña_atun';
import Estofado_pollo from './pages/Estofado_pollo';
import Ensalada_col from './pages/Ensalada_col';
import Arroz_pollo_chorizo from './pages/Arroz_pollo_chorizo';
import Addrecipe from './pages/Addrecipe';
import Favoritos from './pages/Favoritos';
import Aboutus from './pages/Aboutus';
import Config from './pages/Config';
import Matias from './pages/Matias';
import SebaR from './pages/SebaR';
import SebaN from './pages/SebaN';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Account from './pages/Account';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const App: React.FC = () => (
  <AuthProvider>
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/Fetuccini" component={Fetuccini} exact={true} />
        <Route path="/Langostinos" component={Langostinos} exact={true} />
        <Route path="/Lasaña_atun" component={Lasaña_atun} exact={true} />
        <Route path="/Estofado_pollo" component={Estofado_pollo} exact={true} />
        <Route path="/Ensalada_col" component={Ensalada_col} exact={true} />
        <Route path="/Arroz_pollo_chorizo" component={Arroz_pollo_chorizo} exact={true} />
        <Route path="/Addrecipe" component={Addrecipe} exact={true} />
        <Route path="/Favoritos" component={Favoritos} exact={true} />
        <Route path="/Aboutus" component={Aboutus} exact={true} />
        <Route path="/Config" component={Config} exact={true} />
        <Route path="/Matias" component={Matias} exact={true} />
        <Route path="/SebaR" component={SebaR} exact={true} />
        <Route path="/SebaN" component={SebaN} exact={true} />
        <Route path="/Login" component={Login} exact={true} />
        <Route path="/Register" component={Register} exact={true} />
        <Route path="/Reset" component={Reset} exact={true} />
        <Route path="/Account" component={Account} exact={true} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  </AuthProvider>
);

export default App;