class Campaign {
  constructor(title, signs) {
    this.title = title;
    this.signs = signs;
  }
  toString() {
    return this.title + this.signs;
  }
}

// Firestore data converter
var campaignConverter = {
  toFirestore: function (campaign) {
    return {
      title: campaign.title,
      signs: campaign.signs,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Campaign(data.title, data.signs);
  },
};

export { campaignConverter };
