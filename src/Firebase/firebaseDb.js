import { campaignConverter } from "../converters/campaign";

class FirebaseDb {
  constructor(app) {
    this.db = app.firestore(); //getting db from the app object we pass in
  }

  getCampaigns() {
    var campaignArr = [];
    this.db
      .collection("campaign")
      .withConverter(campaignConverter)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          var campaign = doc.data();
          campaignArr.push(campaign);
        });
        
      });
      return campaignArr;
  }
}

export default FirebaseDb;
