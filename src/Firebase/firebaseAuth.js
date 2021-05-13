class FirebaseAuth {
  constructor(app) {
    this.auth = app.auth(); //getting a reference to the auth service
  }

  //write new campaign to firestore
  loginUser = async (email, password) => {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('ERROR ERROR')
      console.log(error)
    }
  };

  signupUser = async (email, password) => {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('SIGN UP ERROR', email)
      console.log(error)
    }
  }
}

export default FirebaseAuth;
