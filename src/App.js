import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./components/header/header.component";
import Home from "./pages/home/home.component";
import Measure from "./pages/measure/measure.component";
import ExcerciseReport from "./pages/excercise-report/excercise-report.component";
import Login from "./pages/login/login.component";
import Account from "./pages/account/account.component";
import ResetPassword from "./pages/reset-password/reset-password.component";
function App() {
  return (
    <div className="flex flex-col h-screen font-light">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/measure" component={Measure} />
        <Route exact path="/excercise-report" component={ExcerciseReport} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/account/:uid" component={Account} />
        <Route exact path="/reset-password" component={ResetPassword} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
