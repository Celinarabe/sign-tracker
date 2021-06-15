class FirebaseAuth {
  constructor(app) {
    this.auth = app.auth(); //getting a reference to the auth service
  }

  //write new campaign to firestore
  loginUser = async (email, password) => {

      await this.auth.signInWithEmailAndPassword(email, password);
      var user = this.auth.currentUser;
      console.log(user.email);

    
  };

  signupUser = async (email, password) => {
      await this.auth.createUserWithEmailAndPassword(email, password);
      console.log("signed up and logged in");
      var user = this.auth.currentUser;
      console.log(user.email);
    
  };


}

export default FirebaseAuth;
