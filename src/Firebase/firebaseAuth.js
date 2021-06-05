class FirebaseAuth {
  constructor(app) {
    this.auth = app.auth(); //getting a reference to the auth service
  }

  //write new campaign to firestore
  loginUser = async (email, password) => {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      console.log('logged in whaat')
      var user = this.auth.currentUser
      console.log(user.uid)
    } catch (error) {
      console.log('ERROR ERROR')
      console.log(error)
    }
  };

  signupUser = async (email, password) => {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      console.log('signed up and logged in')
      var user = this.auth.currentUser
      console.log(user.email)
    } catch (error) {
      console.log('SIGN UP ERROR')
      console.log(error)
    }
  }



  //realtime listener

}

export default FirebaseAuth;
