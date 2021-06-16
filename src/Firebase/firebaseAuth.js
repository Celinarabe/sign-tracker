class FirebaseAuth {
  constructor(app) {
    this.auth = app.auth(); //getting a reference to the auth service
  }

  //write new campaign to firestore
  loginUser = async (email, password) => {

      await this.auth.signInWithEmailAndPassword(email, password);
      var user = this.auth.currentUser;

    
  };

  signupUser = async (email, password) => {
      await this.auth.createUserWithEmailAndPassword(email, password);
      var user = this.auth.currentUser;
      console.log(user.email);
    
  };

  deleteUser = async () => {
    var user = this.auth.currentUser;
    await user.delete()
  
};


}

export default FirebaseAuth;
