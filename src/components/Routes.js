//component imports
import WelcomePage from "./WelcomePage";
import DashboardPage from "./DashboardPage";

//file imports
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import Navigation from "./Navigation";

const Routes = () => {
  return (
    //BrowserRouter component keeps UI in sync w/the URL
    <BrowserRouter>
      {/* You shouldn't use Link outside of a router. This is why Nav component needs to be inside router component */}
      {/* <Navigation /> */}
      {/* Switch component looks through our defined routes and matches with route requested */}
      <Switch>
        <Route exact path={["/welcome"]} component={WelcomePage} />
        <Route exact path={["/","/dashboard"]} component={DashboardPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
