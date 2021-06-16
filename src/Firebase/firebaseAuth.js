class FirebaseAuth {
  constructor(app) {
    this.auth = app.auth(); //getting a reference to the auth service
  }

  loginUser = async (email, password) => {
    await this.auth.signInWithEmailAndPassword(email, password);
  };

  signupUser = async (email, password) => {
    await this.auth.createUserWithEmailAndPassword(email, password);
  };

  deleteUser = async () => {
    var user = this.auth.currentUser;
    await user.delete();
  };
}

export default FirebaseAuth;
