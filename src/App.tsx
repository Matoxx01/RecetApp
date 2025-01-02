import { Redirect, Route } from 'react-router-dom';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Keyboard } from '@capacitor/keyboard';
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
import Login_start from './pages/Login_start';
import Register from './pages/Register';
import Register_start from './pages/Register_start';
import Reset from './pages/Reset';
import Reset_account from './pages/Reset_account';
import Reset_start from './pages/Reset_start';
import Account from './pages/Account';
import Myrecipes from './pages/Myrecipes';
import editrecipe from './pages/editrecipe';

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
const [user, setUser] = useState<{ uid: string; email: string } | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
});

  const setAuthStatus = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status.toString());
  };

  const setAuthUser = (user: { uid: string; email: string } | null) => {
    setUser(user);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn: setAuthStatus, setUser }}>
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
  user: { uid: string; email: string } | null;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: { uid: string; email: string } | null) => void;
}

const App: React.FC = () => {
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', (info) => {
      // Aumenta el espacio inferior para evitar que el teclado cubra los inputs
      document.body.style.paddingBottom = `${info.keyboardHeight}px`;
    });

    Keyboard.addListener('keyboardWillHide', () => {
      // Restaura el espacio inferior
      document.body.style.paddingBottom = '0px';
    });

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  return (
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
          <Route path="/Login_start" component={Login_start} exact={true} />
          <Route path="/Register" component={Register} exact={true} />
          <Route path="/Reset" component={Reset} exact={true} />
          <Route path="/Register_start" component={Register_start} exact={true} />
          <Route path="/Reset_start" component={Reset_start} exact={true} />
          <Route path="/Reset_account" component={Reset_account} exact={true} />
          <Route path="/Account" component={Account} exact={true} />
          <Route path="/Myrecipes" component={Myrecipes} exact={true} />
          <Route path="/editrecipe/:id" component={editrecipe} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
)};

export default App;