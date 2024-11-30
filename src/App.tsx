import { Redirect, Route } from 'react-router-dom';
import React, { createContext, useContext, useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import recipe from './pages/recipe';
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


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const setAuthStatus = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status.toString());
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

const App: React.FC = () => (
  <AuthProvider>
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/Addrecipe" component={Addrecipe} exact={true} />
        <Route path="/Favoritos" component={Favoritos} exact={true} />
        <Route path="/Aboutus" component={Aboutus} exact={true} />
        <Route path="/Config" component={Config} exact={true} />
        <Route path="/Matias" component={Matias} exact={true} />
        <Route path="/recipe/:id" component={recipe} />
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