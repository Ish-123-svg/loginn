import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ActivationPage from "./ActivationPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };
  const redirect = (endpoint) => {
    <Redirect to="/login" />;
  };
  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <Redirect to="/login" />
              ) : (
                <Redirect to="/activation" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <div>
                  <Login {...props} setAuth={setAuth} />
                  <Link to="/register">Not Registered? Click Here.</Link>
                </div>
              ) : (
                <Redirect to="/activation" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <div>
                  <Register {...props} redirect={redirect} />
                  <Link to="/login">Already Registered? Click Here.</Link>
                </div>
              ) : (
                <Redirect to="/activation" />
              )
            }
          />
          <Route
            exact
            path="/activation"
            render={(props) =>
              isAuthenticated ? (
                <ActivationPage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
