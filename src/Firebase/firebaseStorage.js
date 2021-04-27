class FirebaseStorage {
  constructor(app) {
    this.storage = app.storage(); //getting a reference to the storage service
    this.signsRef = this.storage.ref().child("signs"); //creating a reference to signs folder
  }

  //this method stores the photo in storage
  uploadSign = (campaignID, fileObj, progressCallback, errorCallback, successCallback) => {
    
    const { file } = fileObj;

    let task = this.signsRef
      .child(campaignID)
      .child(file.name) //should this be our signID? no, can just generate a random string
      .put(file); //should we pass in a file array and map over?

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    task.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        errorCallback(error, fileObj);
        // Handle unsuccessful uploads
      },
      () => { // firebase callback (gets called when upload is complete)
        successCallback(task, fileObj) // our custom callback that takes in the completed task
      }
    );
    console.log('returning from', file.name)
  }
}

export default FirebaseStorage;
