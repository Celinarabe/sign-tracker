import { albumConverter } from "../models/album";
import { signConverter } from "../models/sign";

class FirebaseDb {
  constructor(app) {
    this.db = app.firestore(); //getting db from the app object we pass in
  }

  // //query firestore for album collection
  // //async function returns a promise
  // getalbums = async () => {
  //   const querySnapshot = await this.db //await: wait until this is done to move onto next line
  //     .collection("album")
  //     .withConverter(albumConverter)
  //     .get();

  //   const albums = querySnapshot.docs.map((doc) => doc.data()); //array of album objects
  //   //loop through each album object, query sign collection, and set to album object
  //   for (const album of albums) {
  //     const signList = await this.getSigns(album.id);
  //     album.setSigns(signList);
  //   }

  //   return albums;
  // };

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

  //query firestore for sign subcollection based on albumID
  getSigns = async (albumID) => {
    const signList = await this.db
      .collection("album")
      .doc(albumID)
      .collection("signs")
      .withConverter(signConverter)
      .get();
    return signList.docs.map((doc) => doc.data());
  };

  // upload sign function
  //write new sign to firestore
  createSign = async (signObj, albumID) => {
    //returns new doc
    return await this.db
      .collection("album")
      .doc(albumID)
      .collection("signs")
      .withConverter(signConverter)
      .add(signObj);
  };
}

export default FirebaseDb;
