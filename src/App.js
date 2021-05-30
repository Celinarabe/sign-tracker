import {
  FirebaseApp,
  FirebaseAuth,
  FirebaseDb,
  FirebaseStorage,
} from "./firebase";
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/800.css"
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import { AuthProvider } from "./context/AuthContext";
import "./stylesheets/App.css";
import PhotoForm from "./components/PhotoForm";
import CampaignForm from "./components/CampaignForm";
import CampaignList from "./components/CampaignList";
//import LoginChakra from "./components/LoginChakra";
import Login from "./components/Login";
import { withAuth } from "./hoc/withAuth";
import Routes from "./components/Routes";
import theme from "./theme"

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);
const storage = new FirebaseStorage(firebaseApp);
const auth = new FirebaseAuth(firebaseApp);

function App() {
  return (
     <div>
       <ChakraProvider theme={theme}>
         <CSSReset />
       <Routes />
    {/*      <AuthProvider auth={auth}>
           <CampaignList database={db} />
           <CampaignForm database={db} />
           <PhotoForm storage={storage} database={db} />
           <Login auth={auth} />
         </AuthProvider> */}
       </ChakraProvider>
     </div>
    
  );
}

export default App;
