import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { UserContextProvider } from "./contexts/userContext";
import { ListSecurtyContextProvider } from "./contexts/ListSecurity";

import GlobalStyle from "./global/globalStyle";

import LoginScreen from "./Views/LoginScreen/LoginScreen";
import RegisterScreen from "./Views/RegisterScreen/RegisterScreen";
import Avaliacao from "./Views/Avaliacao/Avaliacao";

import NavBar from "./components/NavBar/index";

// Capacitor
import { StatusBar, Style } from "@capacitor/status-bar";

StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
StatusBar.setBackgroundColor({ color: "#1976d2" }).catch(() => {});

function PlataformRoutes() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <UserContextProvider>
          <Route component={RegisterScreen} exact path="/plataform" />
          <Route component={Avaliacao} exact path="/avaliacao" />
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ListSecurtyContextProvider>
      <Router>
        <Switch>
          <UserContextProvider>
            <Route component={LoginScreen} exact path="/" />
            <Route component={RegisterScreen} exact path="/register" />
            <Route component={PlataformRoutes} exact path="/plataform/avaliacao" />
          </UserContextProvider>
        </Switch>
      </Router>
      <GlobalStyle />
    </ListSecurtyContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
