import DeleteAlbum from "../components/DeleteAlbum";
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
  deleteAlbum = async (albumID, photoList) => {
    await this.deleteAlbumPhotos(albumID, photoList)
    return await this.db.collection("album").doc(albumID).delete();
  };

  //deletes all albums
  deleteUserAlbums = async (albumList) => {
    for (const albumItem of albumList) {
      const photoList = await this.getPhotos(albumItem.id)
      await this.deleteAlbum(albumItem.id, photoList)
    }
  }

  //deletes photo
  deletePhoto = async (albumID, photoID) => {
    return await this.db
      .collection("album")
      .doc(albumID)
      .collection("photos")
      .doc(photoID)
      .delete();
  };

  //delete all photos under an album given photolist context
  deleteAlbumPhotos = async (albumID, photoList) => {
    for (const photoItem of photoList) {
      await this.deletePhoto(albumID, photoItem.id)
    }
  }

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

  //update the photo
  updatePhoto = async (albumID, photoID, updateObj) => {
    return await this.db
      .collection("album")
      .doc(albumID)
      .collection("photos")
      .doc(photoID)
      .update({ ...updateObj });
  };
  /**
   * Returns a listener to a list of albums that a particular user owns.
   * The callback is executed when an album is updated.
   * @param {*} userId   User Id of the current logged in User.
   * @param {*} callback Callback of the component that is registering the listener.
   *                     The Callback function should expect a list of updated albums.
   *                     Typically, the callback should update the requesting component's
   *                     state.
   */
  getAlbumsListener = (userId, callback) => {
    return this.db
      .collection("album")
      .where(`roles.${userId}`, "==", "owner")
      .onSnapshot((snapshot) => {
        const updated = [];
        snapshot.forEach((doc) => {
          updated.push(albumConverter.fromFirestore(doc));
        });
        callback(updated);
      });
  };

  getAlbumListener = (selectedAlbum, callback) => {
    return this.db
      .collection("album")
      .doc(selectedAlbum.id)
      .onSnapshot((snapshot) => {
        const updatedAlbum = {
          ...selectedAlbum,
          ...snapshot.data(),
        };
        callback(updatedAlbum);
      });
  };

  getPhotosListener = (selectedAlbum, callback) => {
    return this.db
      .collection("album")
      .doc(selectedAlbum.id)
      .collection("photos")
      .onSnapshot((snapshot) => {
        const updatedPhotos = [];
        snapshot.forEach((doc) => {
          updatedPhotos.push(photoConverter.fromFirestore(doc));
        });
        callback(updatedPhotos);
      });
  };
}

export default FirebaseDb;
