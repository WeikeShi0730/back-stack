import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./components/header/header.component";

function App() {
  return (
    <div>
      <Header />
      <Switch>
      </Switch>
    </div>
  );
}

export default withRouter(App);
