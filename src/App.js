import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import "./components/Login.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={(props) => <Login {...props} />} />
        <Route path="/welcome" component={(props) => <Welcome {...props} />} />
        <Route
          path="/register"
          component={(props) => <Register {...props} />}
        />
        <Route
          path="/forgotPassword"
          component={(props) => <ForgotPassword {...props} />}
        />
        <Route
          path="/reset-pass"
          component={(props) => <ResetPassword {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
