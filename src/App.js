//component imports
import WelcomePage from "./components/WelcomePage";
import DashboardPage from "./components/DashboardPage";

//file imports
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import {
  FirebaseApp,
  FirebaseAuth,
  FirebaseDb,
  FirebaseStorage,
} from "./firebase";
import { AuthProvider } from "./context/AuthContext";
import { withAuth } from "./hoc/withAuth";
import theme from "./theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//css imports
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/800.css";
import "./stylesheets/App.css";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);
const storage = new FirebaseStorage(firebaseApp);
const auth = new FirebaseAuth(firebaseApp);

function App() {
  return (
    <div>
      <AuthProvider auth={auth}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path={["/welcome"]}
                render={() => <WelcomePage auth={auth} />}
              />
              <Route
                exact
                path={["/", "/dashboard"]}
                render={() => <DashboardPage database={db} />}
              />
            </Switch>
          </BrowserRouter>
          {/* <CampaignList database={db} />
          <CampaignForm database={db} />
          <PhotoForm storage={storage} database={db} />
          <Login auth={auth} /> */}
        </ChakraProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
