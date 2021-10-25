import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./components/header/header.component";
import Home from "./pages/home/home.component";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
