class FirebaseStorage {
  constructor(app) {
    this.storage = app.storage(); //getting db from the app object we pass in
    this.signsRef = this.storage.ref().child("signs");
  }

  // uploadSign = (campaignID, img, progressCallback, completeCallback, errorCallback) => {
  //   //extractData(event.target.files);
  //   let task = props.storage.signsRef
  //     .child('12345')
  //     .child("sign1")
  //     .put(event.target.files[0]);
  //   // Register three observers:
  //   // 1. 'state_changed' observer, called any time the state changes
  //   // 2. Error observer, called on failure
  //   // 3. Completion observer, called on successful completion
  //   task.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // Observe state change events such as progress, pause, and resume
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //     },
  //     (error) => {
  //       console.log(error);
  //       // Handle unsuccessful uploads
  //     },
  //     () => {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       task.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //       });
  //     }
  //   );
  // }
}

export default FirebaseStorage;
