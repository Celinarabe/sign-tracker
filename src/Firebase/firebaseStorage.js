class FirebaseStorage {
  constructor(app) {
    this.storage = app.storage(); //getting db from the app object we pass in
    this.signsRef = this.storage.ref().child("signs");
  }
}

export default FirebaseStorage;
