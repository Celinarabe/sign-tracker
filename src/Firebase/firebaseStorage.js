class FirebaseStorage {
  constructor(app) {
    this.storage = app.storage(); //getting a reference to the storage service
    this.photosRef = this.storage.ref().child("photos"); //creating a reference to photos folder
  }

  //this method stores the photo in storage
  uploadPhoto = (
    albumID,
    fileObj,
    progressCallback,
    errorCallback,
    successCallback
  ) => {
    const { file } = fileObj;

    let task = this.photosRef
      .child(albumID)
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

        progressCallback(progress, fileObj);
      },
      (error) => {
        errorCallback(error, fileObj);
        // Handle unsuccessful uploads
      },
      () => {
        // firebase callback (gets called when upload is complete)
        successCallback(task, fileObj); // our custom callback that takes in the completed task
      }
    );
  };

  deletePhotoFolder = async (albumID) => {
    await this.photosRef
      .child(albumID)
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.delete();
        });
      });
  };
}

export default FirebaseStorage;
