import {
  FirebaseApp,
  FirebaseAuth,
  FirebaseDb,
  FirebaseStorage,
} from "./firebase";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import "./stylesheets/App.css";
import PhotoForm from "./components/PhotoForm";
import CampaignForm from "./components/CampaignForm";
import CampaignList from "./components/CampaignList";
import LoginChakra from "./components/LoginChakra";
import Login from "./components/Login";
import MapContainer from "./components/MapContainer"

import DarkModeSwitch from './components/DarkModeSwitch'


//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);
const storage = new FirebaseStorage(firebaseApp);
const auth = new FirebaseAuth(firebaseApp);

function App() {
  return (
    <div>
      <ChakraProvider>
        <AuthProvider auth={auth}>
          <DarkModeSwitch />
          <LoginChakra />
          <CampaignList database={db} />
          <CampaignForm database={db} />
          <PhotoForm storage={storage} database={db} />
          <Login auth={auth} />
          <MapContainer />
        </AuthProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
