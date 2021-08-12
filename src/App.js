import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./styles.css";

export default function App() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}
