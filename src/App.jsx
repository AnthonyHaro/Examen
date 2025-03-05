import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Estudiantes from "./components/Estudiantes";
import Materias from "./components/Materias";
import Matriculas from "./components/Matriculas";
import Menu from "./components/Menu";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        {!isLoggedIn ? ( 
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Menu />  
            <Switch>
              <Route path="/materias" component={Materias} />
              <Route path="/estudiantes" component={Estudiantes} />
              <Route path="/matriculas" component={Matriculas} />
              
              <Route path="/" exact>
                <h2>Bienvenido al Panel de Administración</h2>
              </Route>
              <Redirect to="/" />
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
