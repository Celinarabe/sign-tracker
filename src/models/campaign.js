class Campaign {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.signs = [];
  }
  toString() {
    return this.title + this.signs;
  }

  setSigns(signList) {
    this.signs = signList;
  }
}

// Firestore data converter
var campaignConverter = {
  toFirestore: function (campaign) {
    return {
      title: campaign.title,
    };
  },
  fromFirestore: function (snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);
    return new Campaign(id, data.title);
  },
};

export { campaignConverter };
