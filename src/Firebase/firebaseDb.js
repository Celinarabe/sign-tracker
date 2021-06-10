import { albumConverter } from "../models/album";
import { photoConverter } from "../models/photo";

class FirebaseDb {
  constructor(app) {
    this.db = app.firestore(); //getting db from the app object we pass in
  }

  //get albums based on user
  //query firestore for all albums associated with a uid
  getUserAlbums = async (userID) => {
    const albumDocs = await this.db
      .collection("album")
      .where(`roles.${userID}`, "==", "owner")
      .withConverter(albumConverter)
      .get();

    return albumDocs.docs.map((doc) => doc.data());
  };

  writeAlbum = async (albumObj) => {
    try {
      await this.createAlbum(albumObj);
      return true;
    } catch (error) {
      return false;
    }
  };

  //write new album to firestore
  createAlbum = async (albumObj) => {
    //returns new doc
    return await this.db
      .collection("album")
      .withConverter(albumConverter)
      .add(albumObj);
  };

  writeUpdate = async (albumObj, newTitle) => {
    try {
      await this.updateAlbum(albumObj, newTitle);
      return true;
    } catch (error) {
      return false;
    }
  };

  updateAlbum = async (albumID, newTitle) => {
    return await this.db
      .collection("album")
      .doc(albumID)
      .update({ title: newTitle });
  };

  deleteAlbum = async (albumID) => {
    return await this.db.collection("album").doc(albumID);
  };

  //query firestore for photo subcollection based on albumID
  getPhotos = async (albumID) => {
    const photoList = await this.db
      .collection("album")
      .doc(albumID)
      .collection("photos")
      .withConverter(photoConverter)
      .get();
    return photoList.docs.map((doc) => doc.data());
  };

  // upload photo function
  //write new photo to firestore
  createPhoto = async (photoObj, albumID) => {
    //returns new doc
    return await this.db
      .collection("album")
      .doc(albumID)
      .collection("photos")
      .withConverter(photoConverter)
      .add(photoObj);
  };
}

export default FirebaseDb;
