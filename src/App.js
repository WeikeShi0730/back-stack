import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./components/header/header.component";
import Home from "./pages/home/home.component";
import Measure from "./pages/measure/measure.component";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import SignOut from "./components/sign-out/sign-out.component";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/measure" component={Measure} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-out/:uid" component={SignOut} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
