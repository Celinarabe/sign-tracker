class Sign {
  constructor(id, image, latitude, longitude, notes, posted, postedTime) {
    this.id = id;
    this.image = image;
    this.latitude = latitude;
    this.longitude = longitude;
    this.notes = notes;
    this.posted = posted;
    this.postedTime = postedTime;
  }
  toString() {
    return (
      this.image +
      this.latitude +
      this.longitude +
      this.notes +
      this.posted +
      this.postedTime
    );
  }
}

// Firestore data converter
var signConverter = {
  toFirestore: function (sign) {
    return {
      image: sign.image,
      latitude: sign.latitude,
      longitude: sign.longitude,
      notes: sign.notes,
      posted: sign.posted,
      postedTime: sign.postedTime,
    };
  },
  fromFirestore: function (snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);
    return new Sign(
      id,
      data.image,
      data.latitude,
      data.longitude,
      data.notes,
      data.posted,
      data.postedTime
    );
  },
};

export { signConverter };
