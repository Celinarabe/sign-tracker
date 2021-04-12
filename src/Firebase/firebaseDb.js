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
}

export default FirebaseDb;
