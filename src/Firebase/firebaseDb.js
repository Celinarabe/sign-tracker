import { albumConverter } from "../models/album";
import { photoConverter } from "../models/photo";

class FirebaseDb {
  constructor(app) {
    this.db = app.firestore(); //getting db from the app object we pass in
  }

  //get all albums based on userID
  getUserAlbums = async (userID) => {
    const albumDocs = await this.db
      .collection("album")
      .where(`roles.${userID}`, "==", "owner")
      .withConverter(albumConverter)
      .get();

    return albumDocs.docs.map((doc) => doc.data());
  };

  //get status of document write
  writeAlbum = async (albumObj) => {
    try {
      await this.createAlbum(albumObj);
      return true;
    } catch (error) {
      return false;
    }
  };

  //get created document
  createAlbum = async (albumObj) => {
    return await this.db
      .collection("album")
      .withConverter(albumConverter)
      .add(albumObj);
  };

  //get status of document update
  writeUpdate = async (albumObj, newTitle) => {
    try {
      await this.updateAlbum(albumObj, newTitle);
      return true;
    } catch (error) {
      return false;
    }
  };

  //get updated document
  updateAlbum = async (albumID, newTitle) => {
    return await this.db
      .collection("album")
      .doc(albumID)
      .update({ title: newTitle });
  };

  //deletes album
  deleteAlbum = async (albumID) => {
    return await this.db.collection("album").doc(albumID);
  };

  //get photo subcollection based on albumID
  getPhotos = async (albumID) => {
    const photoList = await this.db
      .collection("album")
      .doc(albumID)
      .collection("photos")
      .withConverter(photoConverter)
      .get();
    return photoList.docs.map((doc) => doc.data());
  };

  //add new photo to photo sub collection based on albumID
  createPhoto = async (photoObj, albumID) => {
    return await this.db
      .collection("album")
      .doc(albumID)
      .collection("photos")
      .withConverter(photoConverter)
      .add(photoObj);
  };
}

export default FirebaseDb;
