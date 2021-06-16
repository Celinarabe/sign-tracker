class Album {
  constructor(id, title, userID) {
    this.id = id;
    this.title = title;
    this.photos = [];
    this.roles = {[userID]: "owner"}
  }


  setPhotos(photoList) {
    this.photos = photoList;
  }
}

// Firestore data converter
var albumConverter = {
  toFirestore: function (album) {
    return {
      title: album.title,
      roles: album.roles
    };
  },
  fromFirestore: function (snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);
    return new Album(id, data.title, data.roles);
  },
};

export { albumConverter, Album };
