//exports all firebase classes
import FirebaseApp from "./firebaseApp";
import FirebaseDb from "./firebaseDb";
import FirebaseStorage from "./firebaseStorage";
import FirebaseAuth from "./firebaseAuth";

//default export
// export default FirebaseApp;

// can also do a named export if multiple modules
export { FirebaseApp, FirebaseDb, FirebaseStorage, FirebaseAuth };
