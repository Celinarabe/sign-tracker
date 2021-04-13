class Sign {
  constructor(image, latitude, longitude, notes, postedTime) {
    this.image = image;
    this.latitude = latitude;
    this.longitude = longitude;
    this.notes = notes;
    this.postedTime = postedTime;
  }
  toString() {
    return (
      this.image + this.latitude + this.longitude + this.notes + this.postedTime
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
      postedTime: sign.postedTime,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Sign(
      data.image,
      data.latitude,
      data.longitude,
      data.notes,
      data.postedTime
    );
  },
};

export { signConverter };
