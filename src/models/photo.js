class Photo {
  constructor(id, title,image, latitude, longitude, notes) {
    this.id = id;
    this.title = title;
    this.image = image; //download URL in storage
    this.latitude = latitude;
    this.longitude = longitude;
    this.notes = notes;
    // this.posted = posted;
    // this.postedTime = postedTime;
  }
}

// Firestore data converter
var photoConverter = {
  toFirestore: function (photo) {
    return {
      title: photo.title,
      image: photo.image,
      latitude: photo.latitude,
      longitude: photo.longitude,
      notes: photo.notes,
      //posted: true,
      // postedTime: photo.postedTime,
    };
  },
  fromFirestore: function (snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);
    return new Photo(
      id,
      data.title,
      data.image,
      data.latitude,
      data.longitude,
      data.notes,
      // data.posted,
      // data.postedTime
    );
  },
};

export { photoConverter, Photo };
