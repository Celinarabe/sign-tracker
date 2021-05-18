import { FirebaseApp, FirebaseDb, FirebaseStorage } from "./firebase";
import { ChakraProvider } from "@chakra-ui/react";
import "./stylesheets/App.css";
import PhotoForm from "./components/PhotoForm";
import CampaignForm from "./components/CampaignForm";
import CampaignList from "./components/CampaignList";
import Login from "./components/Login";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);
const storage = new FirebaseStorage(firebaseApp);

function App() {
  return (
    <div>
      <ChakraProvider>
        <Login />
        <CampaignList database={db} />
        <CampaignForm database={db} />
        <PhotoForm storage={storage} database={db} />
      </ChakraProvider>
    </div>
  );
}

export default App;
