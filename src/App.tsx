import { Route, Switch } from "react-router";
import AddOrEditPage from "./pages/add-or-edit-page/add-or-edit-page.component";
import HomePage from "./pages/home-page/home-page.component";

const App = () => {
  return (
    <Switch>
      <Route path="/add">
        <AddOrEditPage />
      </Route>
      <Route path="/edit/:eventId">
        <AddOrEditPage edit />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
};

export default App;
