import { campaignConverter } from "../converters/campaign";

class FirebaseDb {
  constructor(app) {
    this.db = app.firestore(); //getting db from the app object we pass in
  }

  //async function returns a promise
  getCampaigns = async () => {
    const querySnapshot = await this.db
      .collection("campaign")
      .withConverter(campaignConverter)
      .get(); //wait until this is done to move onto next line
    return querySnapshot.docs.map((doc) => doc.data());
  };

  // getCampaigns() {
  //   var campaignArr = [];
  //   this.db
  //     .collection("campaign")
  //     .withConverter(campaignConverter)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         var campaign = doc.data();
  //         campaignArr.push(campaign);
  //       });

  //     });
  //     return campaignArr;
  // }
}

export default FirebaseDb;
